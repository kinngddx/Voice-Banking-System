// FILE: src/utils/assistant.js
import { api } from './api';
import { formatINR } from './format';

let pendingAction = null;

const parseAmount = (text) => {
  const lower = text.toLowerCase().replace(/,/g, '');
  const kMatch = lower.match(/(\d+)\s*k\b/);
  if (kMatch) return parseInt(kMatch[1]) * 1000;
  const lakhMatch = lower.match(/(\d+)\s*(?:lakh|lac|l)\b/);
  if (lakhMatch) return parseInt(lakhMatch[1]) * 100000;
  const croreMatch = lower.match(/(\d+)\s*(?:crore|cr)\b/);
  if (croreMatch) return parseInt(croreMatch[1]) * 10000000;
  const directMatch = lower.match(/(\d+)/);
  if (directMatch) return parseInt(directMatch[1]);
  return null;
};

const parseRecipient = (text) => {
  const lower = text.toLowerCase();
  const names = ["mom", "dad", "mum", "papa", "bhai", "sister", "brother", "john", "sarah", "ujjawal", "rahul", "raju"];
  for (const name of names) {
    if (lower.includes(name)) return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const toMatch = text.match(/to\s+(\w+)/i);
  if (toMatch) return toMatch[1].charAt(0).toUpperCase() + toMatch[1].slice(1);
  return null;
};

// 🤖 AI FALLBACK - Uses Gemini (Free API)
const askAI = async (question) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful Indian banking assistant named VoiceBank. Answer in short, friendly manner (max 2-3 sentences). User asked: "${question}"`
            }]
          }]
        })
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure about that. Can I help with balance, transfers, or transactions?";
  } catch (error) {
    console.error('AI Error:', error);
    return "I can help you with balance, transfers, transactions, and more. What would you like to do?";
  }
};

export const processVoiceCommand = async (text) => {
  const user = JSON.parse(localStorage.getItem('vb_user'));
  const userId = user?.id || 1;
  const lower = text.toLowerCase();

  try {
    // PENDING: Awaiting amount
    if (pendingAction === 'awaiting_amount') {
      const amount = parseAmount(text);
      if (amount) {
        pendingAction = null;
        const result = await api.initiateTransfer(userId, 2, amount);
        localStorage.setItem('pending_transfer', JSON.stringify({
          transfer_id: result.transfer_id,
          amount: amount
        }));
        return {
          type: 'card',
          text: `🔐 To transfer ${formatINR(amount)}, please verify OTP: ${result.otp_for_demo}`,
          payload: { type: 'otp_required', transfer_id: result.transfer_id, amount, otp: result.otp_for_demo }
        };
      }
    }

    // PENDING: Awaiting complaint
    if (pendingAction === 'awaiting_complaint') {
      pendingAction = null;
      const result = await api.raiseComplaint(userId, text);
      return {
        type: 'message',
        text: `✅ Complaint registered!\n\n📝 Issue: "${text}"\n🔢 Complaint ID: ${result.complaint_id}\n\nOur team will contact you within 24 hours.`
      };
    }

    // OTP VERIFICATION
    if (lower.includes('verify') || lower.includes('otp') || /^\d{6}$/.test(text.trim())) {
      const otp = text.match(/(\d{6})/)?.[1] || text.match(/(\d+)/)?.[1];
      const pending = JSON.parse(localStorage.getItem('pending_transfer') || '{}');
      if (pending.transfer_id && otp) {
        const result = await api.completeTransfer(userId, pending.transfer_id, otp);
        localStorage.removeItem('pending_transfer');
        return {
          type: 'message',
          text: `✅ Transfer successful! ${formatINR(result.amount)} sent to ${result.recipient}. 💵 New balance: ${formatINR(result.new_balance)}`
        };
      }
    }

    // 💰 BALANCE
    if (lower.includes('balance') || lower.includes('kitna') || lower.includes('how much') || lower.includes('paisa')) {
      const balance = await api.getBalance(userId);
      return { type: 'message', text: `💰 Your current balance is ${formatINR(balance)}.`, payload: { balance } };
    }

    // 💸 TRANSFER
    if (lower.includes('send') || lower.includes('transfer') || lower.includes('pay') || lower.includes('bhej')) {
      const amount = parseAmount(text);
      const recipient = parseRecipient(text);
      if (!amount) {
        pendingAction = 'awaiting_amount';
        return { type: 'message', text: `💸 How much would you like to transfer${recipient ? ` to ${recipient}` : ''}?` };
      }
      const result = await api.initiateTransfer(userId, 2, amount);
      localStorage.setItem('pending_transfer', JSON.stringify({ transfer_id: result.transfer_id, amount }));
      return {
        type: 'card',
        text: `🔐 To transfer ${formatINR(amount)}, verify OTP: ${result.otp_for_demo}`,
        payload: { type: 'otp_required', transfer_id: result.transfer_id, amount, otp: result.otp_for_demo }
      };
    }

    // 📜 TRANSACTIONS / MINI STATEMENT
    if (lower.includes('transaction') || lower.includes('statement') || lower.includes('history') || lower.includes('spent')) {
      const data = await api.getMiniStatement(userId);
      if (data.transactions.length === 0) {
        return { type: 'message', text: `📜 No recent transactions. Balance: ${formatINR(data.balance)}` };
      }
      return {
        type: 'card',
        text: `📜 Mini Statement (Balance: ${formatINR(data.balance)}):`,
        payload: { type: 'transactions', data: data.transactions }
      };
    }

    // 🏦 ACCOUNT DETAILS
    if (lower.includes('account') || lower.includes('details') || lower.includes('ifsc') || lower.includes('account number')) {
      const details = await api.getAccountDetails(userId);
      return {
        type: 'message',
        text: `🏦 Account Details:\n\n👤 Name: ${details.name}\n🔢 A/C: ${details.account_number}\n🏛️ IFSC: ${details.ifsc}\n📍 Branch: ${details.branch}\n📞 Phone: ${details.phone}`
      };
    }

    // 🚫 BLOCK CARD
    if (lower.includes('block') || lower.includes('lost card') || lower.includes('card kho gaya') || lower.includes('emergency')) {
      const result = await api.blockCard(userId);
      return {
        type: 'message',
        text: `🚫 CARD BLOCKED!\n\n${result.message}\n\n🔢 Reference: ${result.reference}\n\n⚠️ Visit nearest branch for new card.`
      };
    }

    // 📒 CHEQUE BOOK
    if (lower.includes('cheque') || lower.includes('check book') || lower.includes('cheque book')) {
      const result = await api.requestChequeBook(userId);
      return {
        type: 'message',
        text: `📒 Cheque Book Request:\n\n${result.message}\n\n🔢 Reference: ${result.reference}`
      };
    }

    // 📍 FIND ATM
    if (lower.includes('atm') || lower.includes('nearest') || lower.includes('cash nikalna')) {
      const result = await api.findNearestATM(userId);
      let atmText = '📍 Nearest ATMs:\n\n';
      result.atms.forEach((atm, i) => {
        atmText += `${i + 1}. ${atm.name}\n   📏 ${atm.distance} | ✅ ${atm.status}\n\n`;
      });
      return { type: 'message', text: atmText };
    }

    // 📝 COMPLAINT
    if (lower.includes('complaint') || lower.includes('problem') || lower.includes('issue') || lower.includes('shikayat')) {
      pendingAction = 'awaiting_complaint';
      return { type: 'message', text: '📝 Please describe your issue or complaint:' };
    }

    // ❓ HELP
    if (lower.includes('help') || lower.includes('kya kar sakte') || lower.includes('options')) {
      return {
        type: 'message',
        text: `🤖 I can help you with:\n\n💰 "Check balance"\n💸 "Send 500 to Mom"\n📜 "Show transactions"\n🏦 "Account details"\n📒 "Request cheque book"\n🚫 "Block my card"\n📍 "Nearest ATM"\n📝 "Raise complaint"\n\n💡 You can also ask me any general question!`
      };
    }

    // 👋 GREETING
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
      return { type: 'message', text: `🙏 Namaste! I'm your banking assistant. How can I help you today?` };
    }

    // 🙏 THANKS
    if (lower.includes('thank') || lower.includes('shukriya') || lower.includes('dhanyawad')) {
      return { type: 'message', text: `😊 You're welcome! Anything else I can help with?` };
    }

    // ❌ CANCEL
    if (lower.includes('cancel') || lower.includes('stop') || lower.includes('ruko')) {
      pendingAction = null;
      localStorage.removeItem('pending_transfer');
      return { type: 'message', text: `❌ Cancelled. How else can I help?` };
    }

    // 🤖 AI FALLBACK - For any other question!
    const aiResponse = await askAI(text);
    return {
      type: 'message',
      text: `🤖 ${aiResponse}`
    };

  } catch (error) {
    console.error('Error:', error);
    pendingAction = null;
    return { type: 'message', text: `❌ Error: ${error.message}` };
  }
};