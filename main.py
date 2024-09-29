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

# OpenAI function to generate blurb with or without user text, and update for comments and posts added
# OpenAI function to generate blurb with or without user text
def generate_blurb(user):
    if user.get('usertext'):  # Check if user has posts/comments
        prompt = (
            f"Write a brief, natural language description of this user, incorporating their profile information and their posts/comments, "
            f"but only consider posts/comments that are related to their career or the energy industry. "
            f"Ignore any unrelated content.\n"
            f"The user works at {user['Company']} in the {user['Department']} department. They hold a {user['Seniority']} position, "
            f"and they started their role on {user['role_start_at']}. They are based in {user['City']}, {user['State']}.\n"
            f"Here are some relevant posts/comments the user has made: \"{user['usertext']}\"\n"
            f"Please summarize their background and contributions."
        )
    else:
        prompt = (
            f"Write a brief, natural language description of this user based only on their profile information.\n"
            f"The user works at {user['Company']} in the {user['Department']} department. They hold a {user['Seniority']} position, "
            f"and they started their role on {user['role_start_at']}. They are based in {user['City']}, {user['State']}.\n"
            f"Please summarize their background."
        )

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
