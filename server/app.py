from config import app, db, api, bcrypt
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask import Flask, make_response, jsonify, request, session, flash

from models import User, Game, Comment, Favorite, CommentReply

class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200


@app.before_request
def check_if_logged_in():
    logged_in = session.get('user_id')
    signing_up = 'signup' in request.path and 'POST' in request.method
    logging_in = 'login' in request.path and 'POST' in request.method
    
    if not logged_in and not signing_up and not logging_in:
        return make_response ( {'message': 'please log in'}, 401 )

class SignUp(Resource):

    def post(self):

        data = request.get_json()

        username = data['username']
        first_name = data['first_name']
        last_name = data['last_name']
        birth_date = data['birthDate']
        image = data['profileImage']
        password = data['password']
        confirm_password = data['confirm']

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

        return { 'message': 'User Created Successfully'}

class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter_by(username = username).first()
        

        if user is None:
            return {'error': 'Invalid username or password'}, 401

        elif user.authenticate(password) == True:
            session['user_id'] = user.id

            user.is_authenticated = True
            db.session.commit()

            result = user.user_dict()
            return make_response(jsonify(result))
        
        else:
            return {'error': 'Invalid username or password'}, 401
        
        ##############################
        

    
class Logout(Resource):

    def delete(self):

        user = User.query.filter(User.id == session.get('user_id')).first()
        user.is_authenticated = False
        db.session.commit()

        session['user_id'] = None
        return {}, 204
    
class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        result = user.user_dict()
        return make_response(jsonify(result), 200)
    

class CheckLoggedIn(Resource):
    def get(self):
        logged_in_users = [user.user_dict() for user in User.query.filter_by(is_authenticated=True)]

        return make_response(logged_in_users, 200)

    
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
            game_image=data['game_image'],
            user_username=data['user_username'],
            user_image=data['user_image']
        )
        db.session.add(new_comment)
        db.session.commit()
        # return {'message': '201, a new comment has been added.'}, 201
        return make_response(new_comment.to_dict(), 201)
    
    
class CommentsById(Resource):
    def get(self, id):
        if id not in [c.id for c in Comment.query.all()]:
            return {'error': '404, Comment not Found!'}, 404

        return make_response((Comment.query.filter(Comment.id==id).first()).to_dict(), 200)

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

        
class Users(Resource):
    def get(self):
        
        return make_response([u.user_dict() for u in User.query.all()], 200)

class UserByID(Resource):
    def get(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        user = User.query.filter(User.id==id).first()
        return make_response(jsonify(user.user_dict()), 200)

    def patch(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        data = request.get_json()
        user = User.query.filter(User.id==id).first()
        for key in data.keys():
            setattr(user, key , data[key])
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify(user.user_dict()), 200)
    
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

class FollowById(Resource):
    def post(self, id):

        user_to_follow = User.query.filter_by(id = id).first()
        current_user = User.query.filter(User.id == session.get('user_id')).first()

        if not current_user.is_following(user_to_follow):
            current_user.following.append(user_to_follow)
            db.session.commit()
            return make_response(user_to_follow.user_dict(), 201)
        else:
            return make_response({'message': 'You are already following this user.'}, 201)
    
class UnfollowById(Resource):
    def delete(self, id):

        current_user = User.query.filter(User.id == session.get('user_id')).first()
        followed_user = User.query.filter_by(id = id).first()

        current_user.unfollow(followed_user)

        return make_response({'message': 'User Unfollowed'}, 200)
    
class Followers(Resource):
    def get(self):
        current_user = User.query.filter(User.id == session.get('user_id')).first()

        followers = [u.user_dict() for u in current_user.followers.all()]

        return make_response(jsonify(followers))
    

class CheckFollowById(Resource):
    def get(self, id):
        current_user = User.query.filter(User.id == session.get('user_id')).first()
        checking_user = User.query.filter_by(id = id).first()

        if current_user.is_following(checking_user):
            return make_response(jsonify({'isFollowing': True}), 200)
        else:
            return make_response(jsonify({'isFollowing': False}), 200)

class CommentReplies(Resource):
    def get(self):
        pass

    def post(self, id):
        
        data = request.get_json()

        try:
            user_id = data['user_id']
            reply = data['reply']
            comment_id = data['comment_id']
            user_username = data['user_username']

        except KeyError as e:
            return {'message': f'Missing required field: {e}'}, 400

        comment = Comment.query.filter(Comment.id==comment_id).first()
        if not comment:
            return {'message': 'Comment not found'}, 404

        new_reply = CommentReply(
            user_id=user_id,
            comment_id= comment_id,
            reply=reply,
            user_username=user_username
        )
        db.session.add(new_reply)
        db.session.commit()
        return make_response(new_reply.to_dict(), 201)

class ReplyById(Resource):
    def delete(self, id):
        if id not in [r.id for r in CommentReply.query.all()]:
            return {'error': '404, Comment not Found!'}, 404

        try:
            reply = CommentReply.query.filter(CommentReply.id==id).first()
            db.session.delete(reply)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The reply has been deleted'}, 200)
    




api.add_resource(HomePage, '/')
api.add_resource(SignUp, '/signup')
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
api.add_resource(FollowById, '/follow/<int:id>')
api.add_resource(UnfollowById, '/unfollow/<int:id>')
api.add_resource(Followers, '/followers')
api.add_resource(CheckFollowById, '/check/<int:id>')
api.add_resource(CommentReplies, '/comments/<int:id>/replies')
api.add_resource(ReplyById, '/deletereply/<int:id>')
api.add_resource(CheckLoggedIn, '/checkloggedin')


if __name__ == '__main__':
    app.run(port = 5555, debug = True)