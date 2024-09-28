from flask import Flask, request, jsonify
from flask_cors import CORS
<strong>#Set up Flask</strong>:
app = Flask(__name__)
<strong>#Set up Flask to bypass CORS</strong>:
cors = CORS(app)

<strong>#Create the receiver API POST endpoint</strong>:
@app.route("/receiver", methods=["POST"])
def postME():
   data = request.get_json()
   data = jsonify(data)
   return data
if __name__ == "__main__":
   app.run(debug=True)