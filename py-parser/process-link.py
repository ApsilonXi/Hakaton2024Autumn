# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import parse

app = Flask(__name__)
CORS(app)
user_link = None
@app.route('/process-link', methods=['POST'])
def process_link():
    global user_link
    data = request.get_json()
    user_link = data.get('link')
    if user_link:
        result = {"processed_link": user_link.upper()}
        print(user_link, type(user_link))
        parse(user_link)
        return jsonify(result), 200
    else:
        user_link = None
        return jsonify({"error": "No link provided"}), 400
    


if __name__ == '__main__':
    app.run(debug=True)
    

