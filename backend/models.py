from app import db

class Job_Application(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable = False)
    role = db.Column(db.String(200), nullable = False)
    description = db.Column(db.Text, nullable = True)
    status = db.Column(db.String(50), nullable = False)
    job_url = db.Column(db.String(200), nullable = False)


# to send data to client side ( which would be in js ), we need to convert data coming from database to json
    def to_json(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "role" : self.role,
            "description" : self.description,
            "status" : self.status,
            "jobUrl" : self.job_url
        }

