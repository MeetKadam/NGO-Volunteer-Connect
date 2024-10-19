# Import necessary modules
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the dataset (Excel file)
file_path = './Volunteer-match-balanced.xlsx'
df = pd.read_excel(file_path)

# Trim whitespace from string columns
df['Gender'] = df['Gender'].str.strip()
df['Type of Organization'] = df['Type of Organization'].str.strip()

# Encode the categorical variables
label_encoder_gender = LabelEncoder()
label_encoder_org_type = LabelEncoder()

df['Gender'] = label_encoder_gender.fit_transform(df['Gender'])
df['Type of Organization'] = label_encoder_org_type.fit_transform(df['Type of Organization'])

# Define features and target variable
X = df[['Age', 'Gender']]
y = df['Type of Organization']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Decision Tree Classifier
classifier = DecisionTreeClassifier()

# Train the model
classifier.fit(X_train, y_train)

# Flask route to get recommendations
@app.route('/recommend_organization', methods=['POST'])
def recommend_organization():
    data = request.json
    age = data['age']
    gender = data['gender'].strip()

    # Convert gender to the encoded value
    gender_encoded = label_encoder_gender.transform([gender])[0]
    
    # Prepare input data for prediction
    input_data = pd.DataFrame([[age, gender_encoded]], columns=['Age', 'Gender'])
    
    # Predict the organization type
    predicted = classifier.predict(input_data)
    
    # Convert prediction back to original organization type
    recommendation = label_encoder_org_type.inverse_transform(predicted)[0]
    
    # Return the recommendation as JSON
    return jsonify({"recommended_organization": recommendation})

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Change the port to 5002

