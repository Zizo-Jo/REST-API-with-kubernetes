from flask import Flask, render_template, jsonify, redirect, url_for
import socket
import time

app = Flask(__name__)

@app.route("/")
def index():
    # Get pod IP address
    pod_ip = socket.gethostbyname(socket.gethostname())
    
    # Show IP address page for 1 second before redirecting
    return render_template('ip_display.html', pod_ip=pod_ip)

@app.route("/main")
def main():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5200)
