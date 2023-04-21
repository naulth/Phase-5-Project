from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api

@app.route('/')
def root_route():
    return "Boulder"

if __name__ == '__main__':
    app.run(port = 5555, debug = True)