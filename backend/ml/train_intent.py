import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

print("🚀 Starting NLP Model Training...")

# Load training data
with open("ml/training_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = []
labels = []

for intent, examples in data.items():
    for ex in examples:
        texts.append(ex.lower())  # Lowercase for better matching
        labels.append(intent)

print(f"📊 Total training examples: {len(texts)}")
print(f"📋 Intents: {list(data.keys())}")

# Split data for validation
X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.2, random_state=42
)

# Vectorizer with better parameters
vectorizer = TfidfVectorizer(
    ngram_range=(1, 3),  # Unigrams, bigrams, trigrams
    max_features=1000,
    min_df=1,
    lowercase=True
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model with better parameters
model = LogisticRegression(
    max_iter=500,
    C=1.0,
    solver='lbfgs',
    multi_class='multinomial',
    random_state=42
)

print("\n🔧 Training model...")
model.fit(X_train_vec, y_train)

# Evaluate
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n✅ Training Complete!")
print(f"🎯 Accuracy: {accuracy * 100:.2f}%")
print("\n📈 Classification Report:")
print(classification_report(y_test, y_pred))

# Save model
with open("ml/intent_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("ml/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("\n💾 Model and vectorizer saved!")
print("✨ Ready to use in production!")