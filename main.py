import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import openai

load_dotenv()
# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Set up Flask
app = Flask(__name__)
cors = CORS(app)

# OpenAI function to generate blurb about each user, including added users
def generate_blurb(user):
    prompt = (f"Create a short description for a user: "
              f"ID: {user['id']}, "
              f"Company: {user['Company']}, "
              f"Department: {user['Department']}, "
              f"Seniority: {user['Seniority']}, "
              f"Role Start Date: {user['role_start_at']}, "
              f"State: {user['State']}, "
              f"City: {user['City']}.")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or "gpt-4" if you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract and return the generated blurb
    return response['choices'][0]['message']['content']

# Create the receiver API POST endpoint
@app.route("/receiver", methods=["POST"])
def postME():
    # Get the user data sent from the frontend
    users = request.get_json()

    # Generate blurbs for each user
    blurbs = [generate_blurb(user) for user in users]

    # Return the generated blurbs to the frontend
    return jsonify(blurbs)

if __name__ == "__main__":
    app.run(debug=True)
