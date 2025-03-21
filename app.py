from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    try:
        url = request.json.get('url')
        if not url:
            return jsonify({'success': False, 'message': 'No URL provided.'})

        api_url = f'https://api.letsdownload.app/instagram?url={url}'
        response = requests.get(api_url)
        data = response.json()

        if 'media' in data and len(data['media']) > 0:
            return jsonify({'success': True, 'video_url': data['media'][0]['url']})
        else:
            return jsonify({'success': False, 'message': 'No video found. Please check the URL.'})
    except Exception as e:
        return jsonify({'success': False, 'message': 'Server error: ' + str(e)})

if __name__ == '__main__':
    app.run(debug=True)
