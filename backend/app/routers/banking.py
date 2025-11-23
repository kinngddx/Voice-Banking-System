from fastapi import APIRouter, HTTPException
from ..db.database import load_db, save_db
from ..services.otp_service import generate_otp
from ..utils.logger import log_info, log_warning, log_error, log_security
router = APIRouter()

@router.get("/balance")
def get_balance(user_id: int):
    db = load_db()
    user = next((u for u in db["users"] if u["id"] == user_id), None)

    if not user:
        log_error("User not found", user_id)
        raise HTTPException(status_code=404, detail="User not found")

    log_info(f"Balance checked: ${user['balance']}", user_id)
    return {"balance": user["balance"], "name": user["name"]}


@router.post("/transfer/initiate")
def initiate_transfer(user_id: int, recipient_id: int, amount: float):
    """Step 1: Validate transfer and request OTP"""
    db = load_db()
    
    sender = next((u for u in db["users"] if u["id"] == user_id), None)
    recipient = next((u for u in db["users"] if u["id"] == recipient_id), None)

    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    if sender["balance"] < amount:
        log_warning(f"Insufficient balance for transfer: ${amount}", user_id)
        raise HTTPException(status_code=400, detail="Insufficient balance")
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")

    # Store pending transfer
    transfer_id = len(db.get("pending_transfers", [])) + 1
    if "pending_transfers" not in db:
        db["pending_transfers"] = []
    
    db["pending_transfers"].append({
        "transfer_id": transfer_id,
        "sender_id": user_id,
        "recipient_id": recipient_id,
        "amount": amount,
        "status": "pending_otp"
    })
    save_db(db)

    # Generate OTP
    otp = generate_otp(user_id)
    
    log_security(f"Transfer initiated: ${amount} to user {recipient_id}", user_id)
    
    return {
        "action": "REQUIRE_OTP",
        "message": f"OTP sent to your phone. Please verify to transfer ${amount} to {recipient['name']}",
        "transfer_id": transfer_id,
        "otp_for_demo": otp  # Remove in production!
    }
# ===========================
# ACCOUNT DETAILS
# ===========================
@router.get("/account-details")
def get_account_details(user_id: int):
    db = load_db()
    user = next((u for u in db["users"] if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    log_info(f"Account details requested", user_id)
    
    return {
        "name": user["name"],
        "account_number": f"XXXX{user['id']:04d}",
        "ifsc": "VOICE0001234",
        "branch": "Digital Banking Branch",
        "phone": user.get("phone", "Not registered"),
        "email": user.get("email", "Not registered")
    }


# ===========================
# MINI STATEMENT
# ===========================
@router.get("/mini-statement")
def get_mini_statement(user_id: int):
    db = load_db()
    user = next((u for u in db["users"] if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    transactions = db.get("transactions", [])
    user_txns = [t for t in transactions if t.get("from") == user_id or t.get("to") == user_id][-5:]
    
    log_info(f"Mini statement requested", user_id)
    
    return {
        "balance": user["balance"],
        "transactions": user_txns,
        "message": f"Last {len(user_txns)} transactions"
    }


# ===========================
# BLOCK CARD (Emergency)
# ===========================
@router.post("/block-card")
def block_card(user_id: int):
    log_security(f"CARD BLOCKED - Emergency request", user_id)
    
    return {
        "status": "success",
        "message": "Your card has been blocked successfully. Visit nearest branch for new card.",
        "reference": f"BLK{user_id}2024"
    }


# ===========================
# REQUEST CHEQUE BOOK
# ===========================
@router.post("/request-cheque")
def request_cheque_book(user_id: int):
    log_info(f"Cheque book requested", user_id)
    
    return {
        "status": "success",
        "message": "Cheque book request submitted. You will receive it within 7 working days.",
        "reference": f"CHQ{user_id}2024"
    }


# ===========================
# RAISE COMPLAINT
# ===========================
@router.post("/complaint")
def raise_complaint(user_id: int, issue: str):
    log_info(f"Complaint raised: {issue}", user_id)
    
    return {
        "status": "success",
        "complaint_id": f"CMP{user_id}2024",
        "message": f"Your complaint has been registered. Our team will contact you within 24 hours.",
        "issue": issue
    }


# ===========================
# FIND NEAREST ATM
# ===========================
@router.get("/nearest-atm")
def find_nearest_atm(user_id: int):
    # Mock ATM data
    atms = [
        {"name": "SBI ATM - Main Road", "distance": "0.5 km", "status": "Working"},
        {"name": "HDFC ATM - Market", "distance": "1.2 km", "status": "Working"},
        {"name": "ICICI ATM - Station", "distance": "1.8 km", "status": "Cash Available"}
    ]
    
    log_info(f"ATM search requested", user_id)
    
    return {"atms": atms}


# ===========================
# UPDATE USER PROFILE
# ===========================
@router.post("/update-profile")
def update_profile(user_id: int, phone: str = None, card_number: str = None):
    db = load_db()
    user = next((u for u in db["users"] if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if phone:
        user["phone"] = phone
        log_info(f"Phone updated: {phone}", user_id)
    
    if card_number:
        user["card"] = card_number[-4:]  # Store only last 4 digits
        log_info(f"Card added: ****{card_number[-4:]}", user_id)
    
    save_db(db)
    
    return {"status": "success", "message": "Profile updated"}


@router.post("/transfer/complete")
def complete_transfer(user_id: int, transfer_id: int, otp: str):
    """Step 2: Verify OTP and complete transfer"""
    from ..services.otp_service import verify_otp
    
    # Verify OTP first
    otp_result = verify_otp(user_id, otp)
    if not otp_result["success"]:
        log_security(f"Failed OTP verification: {otp_result['msg']}", user_id)
        raise HTTPException(status_code=401, detail=otp_result["msg"])

    db = load_db()
    
    # Find pending transfer
    transfer = next((t for t in db.get("pending_transfers", []) if t["transfer_id"] == transfer_id), None)
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")
    if transfer["sender_id"] != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    if transfer["status"] != "pending_otp":
        raise HTTPException(status_code=400, detail="Transfer already processed")

    # Execute transfer
    sender = next(u for u in db["users"] if u["id"] == transfer["sender_id"])
    recipient = next(u for u in db["users"] if u["id"] == transfer["recipient_id"])

    sender["balance"] -= transfer["amount"]
    recipient["balance"] += transfer["amount"]
    transfer["status"] = "completed"

    # Log transaction
    if "transactions" not in db:
        db["transactions"] = []
    db["transactions"].append({
        "type": "transfer",
        "from": sender["id"],
        "to": recipient["id"],
        "amount": transfer["amount"]
    })

    save_db(db)
    
    log_info(f"Transfer completed: ${transfer['amount']} to {recipient['name']}", user_id)

    return {
        "message": "Transfer successful!",
        "amount": transfer["amount"],
        "recipient": recipient["name"],
        "new_balance": sender["balance"]
    }