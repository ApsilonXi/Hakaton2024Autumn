# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import parse

app = Flask(__name__)
CORS(app)

@app.route('/process-link', methods=['POST'])
def process_link():
    data = request.get_json()
    user_link = data.get('link')
    if user_link:
        product_data = parse(user_link)
        return jsonify(product_data), 200
    else:
        return jsonify({"error": "No link provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)

