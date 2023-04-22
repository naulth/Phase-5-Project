from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User


class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200

class SignUp(Resource):

    def post(self):

        username = request.json['username']
        password = request.json['password']
        confirm_password = request.json['confirm_password']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        hashed_confirm_password = bcrypt.generate_password_hash(confirm_password)
        new_user = User(
            username=username,
            _password_hash=hashed_password,
            confirm_password = hashed_confirm_password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "id": new_user.id,
            "username": new_user.username
        })

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        password = request.get_json().get('password')
        user = User.query.filter(User.username == username).first()
        
        if user is None:
            return {'error': 'Invalid username or password'}, 401
        
        elif user.authenticate(password) == True:
            flash("Login Successful")
            session.permanent = True
            session['user_id'] = user.id
            return jsonify({
                "id": user.id,
                "username": user.username
            })

        else:
            return {'error', 'Invalid username or password'}, 401

    
class Logout(Resource):

    def delete(self):
        session.pop("user_id", None)
        return {}, 204
    
class CheckSession(Resource):

    def get(self):

        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401

api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


if __name__ == '__main__':
    app.run(port = 5555, debug = True)