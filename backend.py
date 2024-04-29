''This backend is hosted at naitikmundra18.pythonanywhere.com for api calls''' 

import json
import requests
from flask import Flask, request
from flask_cors import CORS  # Import CORS from flask_cors
import urllib
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

class IPQS:
    key = 'qHgRkbygkOIr9ksDnjNrqcdvfsRHw3ah'

    def malicious_url_scanner_api(self, url: str, vars: dict = {}) -> dict:
        url = 'https://www.ipqualityscore.com/api/json/url/%s/%s' % (self.key, urllib.parse.quote_plus(url))
        x = requests.get(url, params=vars)
        return json.loads(x.text)

@app.route('/safetyness', methods=['GET'])
def check_safety():
    domain = request.args.get('domain')
    strictness = request.args.get('strictness', 0)

    ipqs = IPQS()
    result = ipqs.malicious_url_scanner_api(domain, {'strictness': strictness})

    if 'success' in result and result['success'] == True:
        safety_status = {
            "domain": domain,
            "spamming": result.get("spamming"),
            "malware": result.get("malware"),
            "phishing": result.get("phishing"),
            "suspicious": result.get("suspicious"),
            "adult": result.get("adult")
        }
        return json.dumps(safety_status), 200
    else:
        return json.dumps({"error": "Unable to retrieve safety status"}), 500
