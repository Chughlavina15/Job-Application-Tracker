# entry point of the app

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///job_applications.db"
app.config["SQLALCHEMY_TRACK_MODIFIACTIONS"] = False

# db object
db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

# sending path of static files in frontend/dist folder
@app.route("/", defaults = {"filename" : ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)


import routes

# optimises creation of tables
# sql alchemy creates context in background and does its job in a better way
with app.app_context():
    # creating tables in our db
    db.create_all()


if __name__ == "__main__":
    app.run(debug = True)