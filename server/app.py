from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User, Game, Comment


class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200

class SignUp(Resource):

    def post(self):

        username = request.json['username']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        birth_date = request.json['birth_date']
        image = request.json['image']
        password = request.json['password']
        confirm_password = request.json['confirm_password']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        hashed_confirm_password = bcrypt.generate_password_hash(confirm_password)
        new_user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date,
            image=image,
            _password_hash=hashed_password,
            confirm_password = hashed_confirm_password
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()
        

class Login(Resource):

    # def post(self):

    #     username = request.get_json()['username']
    #     password = request.get_json()['password']
        

    #     user = User.query.filter(User.username == username).first()

    #     if user.authenticate(password) == True:
    #         session['user_id'] = user.id
    #         return user.to_dict()

    ################################

    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        
        if user.authenticate(password) == True:
            session['user_id'] = user.id
            return user.to_dict()

        elif user is None:
            return {'error': 'Invalid username or password'}, 401

        else:
            return {'error', 'Invalid username or password'}, 401
        
        ##############################
        
    # def post(self):

    #     username = request.get_json().get('username')
    #     password = request.get_json().get('password')
    #     user = User.query.filter(User.username == username).first()

    #     # password = request.get_json()['password']

    #     # if user.authenticate(password):
    #     if user is None:
    #         return {'error': 'Invalid email or password'}, 401
    #     if not bcrypt.check_password_hash(user._password_hash, password):
    #         return {'error': 'Invalid email or password'}, 401

    #     flash("Login Successful!")
    #     session.permanent = True
    #     ###SESSION PERMANENT NOT WORKING
    #     session['user_id'] = user.id
        
    #     return jsonify({
    #         "id": user.id,
    #         "username": user.username,
    #         "first_name": user.first_name
    #     })

    
class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {}, 204
    
class CheckSession(Resource):

    def get(self):

        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return user.to_dict(), 200
        else:
            return {'message', '401: Not Authorized'}, 401
    
class Games(Resource):
    def get(self):
        return make_response([g.to_dict() for g in Game.query.all()], 200)
    
class GameByID(Resource):
    def get(self, id):
        if id not in [g.id for g in Game.query.all()]:
            return {'error': '404, Game not Found!'}, 404

        return make_response((Game.query.filter(Game.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [g.id for g in Game.query.all()]:
            return {'error': '404, Game not Found!'}, 404

        data = request.get_json()
        game = Game.query.filter(Game.id==id).first()
        for key in data.keys():
            setattr(game, key , data[key])
        db.session.add(game)
        db.session.commit()
        return make_response(game.to_dict(), 200)

    def delete(self, id):
        if id not in [g.id for g in Game.query.all()]:
            return {'error': '404, Game not Found!'}, 404
        try:
            db.session.query(Comment).filter(Comment.user_id == id).delete()
            game = Game.query.filter(Game.id==id).first()
            db.session.delete(game)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The game has been deleted'}, 200)
    
class Comments(Resource):
    def get(self):
        return make_response([c.to_dict() for c in Comment.query.all()], 200)
    
    def post(self):
        data = request.get_json()
        new_comment = Comment(
            score=data['score'],
            content=data['content'],
            game_id=data['game_id'],
            user_id=data['user_id'],
            user_username=data['user_username'],
            game_name=data['game_name']
        )
        db.session.add(new_comment)
        db.session.commit()
        return {'message': '201, a new comment has been added.'}, 201
    
class CommentsByGameId(Resource):
    def get(self, id):
        if id not in [g.id for g in Game.query.all()]:
            return {'error': '404, Game not Found!'}, 404

        return make_response((Game.query.filter(Game.id==id).first().comments).to_dict(), 200)



api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Games, '/games')
api.add_resource(GameByID, '/games/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentsByGameId, '/commets/<int:id>')

if __name__ == '__main__':
    app.run(port = 5555, debug = True)