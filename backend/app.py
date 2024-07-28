from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain_runner import generate_fact_check_and_fix

app = Flask(__name__)
CORS(app)


@app.route('/api/button-message', methods = ['GET'])
def get_button_message():
    return jsonify({"message": "Button clicked. This is a message from Flask!"})

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()  # Get the JSON data from the request
    # print(data["subject"]) # works as intended
    
    return jsonify({"message": "Form submitted successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)