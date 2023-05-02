from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User, Game, Comment, Favorite, Follow

class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200


@app.before_request
def check_if_logged_in():
    logged_in = session.get('user_id')
    signing_up = 'signup' in request.path and 'POST' in request.method
    logging_in = 'login' in request.path and 'POST' in request.method
    grabbing_games = 'games' in request.path
    grabbing_comments = 'comments' in request.path
    grabbing_favorites = 'favorites' in request.path
    grabbing_users = 'users' in request.path
    
    if not logged_in and not signing_up and not logging_in and not grabbing_games and not grabbing_comments and not grabbing_favorites and not grabbing_users:
        return make_response ( {'message': 'please log in'}, 401 )

class SignUp(Resource):

    def post(self):

        username = request.json['username']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        birth_date = request.json['birthDate']
        image = request.json['profileImage']
        password = request.json['password']
        confirm_password = request.json['confirm']

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
        user = User.query.filter_by(username = username).first()
        
        if user.authenticate(password) == True:
            session['user_id'] = user.id
            return user.to_dict()

        elif user is None:
            return {'error': 'Invalid username or password'}, 401

        else:
            return {'error', 'Invalid username or password'}, 401
        
        ##############################
        

    
class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {}, 204
    
class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        return user.to_dict(), 200
    
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
            game_id=data['game_id'],
            user_id=data['user_id'],
            score=data['score'],
            content=data['content'],
            game_name=data['game_name'],
            user_username=data['user_username']
        )
        db.session.add(new_comment)
        db.session.commit()
        # return {'message': '201, a new comment has been added.'}, 201
        return make_response(new_comment.to_dict(), 201)
    
    
class CommentsById(Resource):

    def patch(self, id):
        if id not in [c.id for c in Comment.query.all()]:
            return {'error': '404, Comment not Found!'}, 404

        data = request.get_json()
        comment = Comment.query.filter(Comment.id==id).first()
        for key in data.keys():
            setattr(comment, key , data[key])
        db.session.add(comment)
        db.session.commit()
        return make_response(comment.to_dict(), 200)

    def delete(self, id):
        if id not in [c.id for c in Comment.query.all()]:
            return {'error': '404, Comment not Found!'}, 404

        try:
            comment = Comment.query.filter(Comment.id==id).first()
            db.session.delete(comment)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The comment has been deleted'}, 200)


# class CommentsByUserId(Resource):
#     def get(self, id):
#         if id not in [u.id for u in User.query.all()]:
#             return {'error': '404, User not Found!'}, 404

#         return make_response((User.query.filter(User.id==id).first()).comments.to_dict(), 200)
        
class Users(Resource):
    def get(self):
        return make_response([u.to_dict() for u in User.query.all()], 200)

class UserByID(Resource):
    def get(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        return make_response((User.query.filter(User.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        data = request.get_json()
        user = User.query.filter(User.id==id).first()
        for key in data.keys():
            setattr(user, key , data[key])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404
        try:
            db.session.query(Comment).filter(Comment.user_id == id).delete()
            user = User.query.filter(User.id==id).first()
            db.session.delete(user)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The user and their comments have been deleted'}, 200)
    

class Favorites(Resource):
    def get(self):
        return make_response([f.to_dict() for f in Favorite.query.all()], 200)
    
    def post(self):
        data = request.get_json()
        new_favorite = Favorite(
            game_id=data['game_id'],
            user_id=data['user_id'],
            game_image=data['game_image'],
            game_title=data['game_title']
        )
        db.session.add(new_favorite)
        db.session.commit()
        return make_response(new_favorite.to_dict())
    
class FavoritesById(Resource):
    def delete(self, id):
        if id not in [f.id for f in Favorite.query.all()]:
            return {'error': '404, Favorite not Found!'}, 404

        try:
            favorite = Favorite.query.filter(Favorite.id==id).first()
            db.session.delete(favorite)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The favorite has been deleted'}, 200)

# class FollowersById(Resource):
#     def get(self, id):
#         if id not in [u.id for u in User.query.all()]:
#             return {'error', '404 User not found'}
#         else:
#             user = User.query.filter(User.id==id).first()
#             return make_response(user.is_followed_by().to_dict())
        
class Followers(Resource):
    def post(self):
        data = request.get_json()
        new_follow = Follow(
            follower_id = data['follower_id'],
            followed_id = data['followed_id']
        )
        db.session.add(new_follow)
        db.session.commit()
        return make_response(new_follow.to_dict())


api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Games, '/games')
api.add_resource(GameByID, '/games/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(Favorites, '/favorites')
api.add_resource(FavoritesById, '/favorites/<int:id>')
api.add_resource(Followers, '/followers')

if __name__ == '__main__':
    app.run(port = 5555, debug = True)