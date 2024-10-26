from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import parse, search_by_name_and_parse
import json

app = Flask(__name__)
CORS(app)

@app.route('/process-link', methods=['POST'])
def process_link():
    data = request.get_json()
    user_link = data.get('link')
    if user_link:
        product_data = parse(user_link)
        if product_data:
            related_products = search_by_name_and_parse(product_data.get('name'))
            return jsonify({"original": product_data, "related": related_products}), 200
        else:
            return jsonify({"error": "Unable to parse product data from link"}), 400
    else:
        return jsonify({"error": "No link provided"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


