from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/button-message', methods = ['GET'])
def get_button_message():
    return jsonify({"message": "Button clicked. This is a message from Flask!"})

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()  # Get the JSON data from the request
    print(data)
    json_formatted_data = process_data(data)
    
    return jsonify({"message": "Form submitted successfully!"}), 200

# to process data in there^^
def process_data(data):
    """Katie, process the data however you wish remember that data is a python dict

        :param data: form submission data from frontend
        :type data: dict
        :returns: a processed format of the input data
        :rtype: json
        """
    # Function implementation
    
    return 0
    

if __name__ == '__main__':
    app.run(debug=True)