from app import app, db
from flask import request, jsonify
from models import Job_Application
from constants import REQUIRED_FIELDS

# naming route for get method
@app.route("/api/job_applications", methods = ["GET"])
def get_job_applications():
    # querying data from database in python
    # select * from Job_Application
    job_applications = Job_Application.query.all()
    data_in_json_format = [job_application.to_json() for job_application in job_applications]
    return jsonify(data_in_json_format)

# creating a new record
@app.route("/api/job_applications", methods = ["POST"])
def create_job_application():
    try:
        data = request.json

        print("data is ", data)
        for field in REQUIRED_FIELDS:
            if field not in data or not data.get(field):
                return jsonify({"error" : f"Missing Required Field {field}"}), 400
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        status = data.get("status")
        job_url = f"https://logo.clearbit.com/{name}.com"
        new_job_record = Job_Application(name = name, role = role, description = description, status = status, job_url = job_url)

        db.session.add(new_job_record)

        db.session.commit()

        return jsonify(new_job_record.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error " : str(e)}), 500


# deleting an existing record
@app.route("/api/job_applications/<int:id>", methods = ["DELETE"])
def delete_job_application(id):
    try:
        job_application_record = Job_Application.query.get(id)

        # if record is not present in the database
        if job_application_record is None:
            return jsonify({"msg" : "No such record found"}), 404
        
        # if record is present, we delete it from our database
        db.session.delete(job_application_record)
        db.session.commit()

        return jsonify({"msg": "db record deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error " : str(e)}), 500


# updating an existing record
@app.route("/api/job_applications/<int:id>", methods = ["PATCH"])
def update_job_application(id):
    try:
        job_application_record = Job_Application.query.get(id)

        # if record is not present in the database
        if job_application_record is None:
            return jsonify({"msg" : "No such record found"}), 404

        # if record is present, we update it in our database
        data = request.json

        job_application_record.name = data.get("name", job_application_record.name)
        job_application_record.role = data.get("role", job_application_record.role)
        job_application_record.description = data.get("description", job_application_record.description)
        job_application_record.status = data.get("status", job_application_record.status)

        db.session.commit()

        return jsonify({job_application_record.to_json()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error " : str(e)}), 500



    

