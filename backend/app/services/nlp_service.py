import pickle
import re
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../ml/intent_model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "../../ml/vectorizer.pkl")

try:
    with open(VECTORIZER_PATH, "rb") as f:
        vectorizer = pickle.load(f)
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    MODEL_LOADED = True
    print("✅ NLP Model loaded successfully!")
except Exception as e:
    print(f"⚠️ Model not found: {e}")
    MODEL_LOADED = False

def extract_amount(text: str):
    match = re.search(r"\b(\d+)\b", text)
    return int(match.group()) if match else None

def extract_recipient(text: str):
    names = ["raju", "mom", "dad", "mum", "papa", "bhai", "sister", "brother", "john", "sarah", "ujjawal", "rahul"]
    for word in text.lower().split():
        if word in names:
            return word.capitalize()
    return None

def predict_intent(text: str):
    if not MODEL_LOADED:
        # Keyword fallback
        text_lower = text.lower()
        if any(w in text_lower for w in ["balance", "kitna", "money have"]):
            intent = "CheckBalance"
        elif any(w in text_lower for w in ["transfer", "send", "pay", "bhej"]):
            intent = "TransferMoney"
        elif any(w in text_lower for w in ["transaction", "history", "spent"]):
            intent = "CheckTransactions"
        elif any(w in text_lower for w in ["otp", "verify", "code"]):
            intent = "VerifyOTP"
        elif any(w in text_lower for w in ["account", "ifsc", "details"]):
            intent = "AccountDetails"
        elif any(w in text_lower for w in ["block", "lost card"]):
            intent = "BlockCard"
        elif any(w in text_lower for w in ["cheque", "check book"]):
            intent = "RequestCheque"
        elif any(w in text_lower for w in ["atm", "nearest", "cash"]):
            intent = "FindATM"
        elif any(w in text_lower for w in ["complaint", "problem", "shikayat"]):
            intent = "RaiseComplaint"
        else:
            intent = "Unknown"
        confidence = 0.85
    else:
        # ML prediction with confidence
        X = vectorizer.transform([text.lower()])
        intent = model.predict(X)[0]
        
        # Get probability (confidence)
        proba = model.predict_proba(X)[0]
        confidence = float(np.max(proba))

    entities = {}
    if intent == "TransferMoney":
        if amt := extract_amount(text):
            entities["amount"] = amt
        if rec := extract_recipient(text):
            entities["recipient"] = rec
    if intent == "VerifyOTP":
        if otp := extract_amount(text):
            entities["otp"] = otp

    return {
        "intent": intent,
        "confidence": round(confidence * 100, 2),
        "entities": entities
    }