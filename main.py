import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import openai

load_dotenv()
# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY') #change for later

# Use the ChatCompletion endpoint for newer models, updated models
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",  # You can replace this with "gpt-4" if you have access
    messages=[
        {"role": "system", "content": "You are an assistant."},
        {"role": "user", "content": "Hello, how can I help you?"}
    ]
)

# Access the response content
print(response['choices'][0]['message']['content'])

# Set up Flask
app = Flask(__name__)

# Set up Flask to bypass CORS
cors = CORS(app)

# Create the receiver API POST endpoint
@app.route("/receiver", methods=["POST"])
def postME():
    data = request.get_json()
    data = jsonify(data)
    return data

if __name__ == "__main__":
    app.run(debug=True)
