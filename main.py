import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY') or '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'

# Use the ChatCompletion endpoint for newer models
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
