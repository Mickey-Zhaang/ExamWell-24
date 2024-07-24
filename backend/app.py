from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/button-message', methods = ['GET'])
def get_button_message():
    return jsonify({"message": "Button clicked. This is a message from Flask!"})


if __name__ == '__main__':
    app.run(debug=True)