from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime, timedelta
from sqlalchemy.orm import validates
import re



followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followee_id', db.Integer, db.ForeignKey('users.id'))
)


class User (db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ( '-favorites', '-followers', '-comments', '-followers.user',)


    id = db.Column( db.Integer, primary_key = True )

    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_date = db.Column(db.String, nullable=False)
    username = db.Column( db.String, unique = True, nullable = False)
    image = db.Column(db.String, nullable = False)
    _password_hash = db.Column( db.String, nullable = False )
    confirm_password = db.Column(db.String, nullable = False)
    is_authenticated = db.Column(db.Boolean, nullable = False, default=False)

    comments = db.relationship('Comment', backref='user', cascade='all, delete')
    favorites = db.relationship('Favorite', backref='user', cascade='all, delete')

    followers = db.relationship('User', 
                                 secondary='followers',
                                 primaryjoin=('followers.c.followee_id == User.id'),
                                 secondaryjoin=('followers.c.follower_id == User.id'),
                                 backref=db.backref('following', lazy='dynamic', cascade='all, delete'), lazy='dynamic', cascade='all, delete')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 5:
            raise ValueError("Username must be at least 5 characters.")
        return username
    
    @validates('first_name', 'last_name')
    def validate_names(self, key, value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        elif isinstance(value, int):
            raise ValueError('Integer values are not allowed.')
        return value
    
    @validates('birth_date')
    def validate_birth_date(self, key, value):
        birth_date = datetime.strptime(value, '%Y-%m-%d')
        age = datetime.now() - birth_date
        if age < timedelta(days=365*18):
            raise ValueError('User must be over 18 years old.')
        return value
    
    @validates('image')
    def validate_image(self, key, value):
        if len(value) < 1:
            raise ValueError('Image field cannot be empty.')
        return value
        
    @validates('_password_hash', 'confirm_password' )
    def validate_password(self, key, value):
        # if not re.search(r'[A-Z]', value):
        #     raise ValueError('Password must include at least one capital letter.')
        # if not re.search(r'[a-z]', value):
        #     raise ValueError('Password must include at least one lowercase letter.')
        # if not re.search(r'\d', value):
        #     raise ValueError('Password must include at least one number.')
        # if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
        #     raise ValueError('Password must include at least one symbol.')
        if len(value) < 8:
            raise ValueError('Password must be at least 8 characters long.')
        return value

    def is_following(self, user):
        return self.following.filter(followers.c.followee_id == user.id).count() > 0
    
    def unfollow(self, user):
        if not self.is_following(user):
            return False
        
        self.following.remove(user)
        db.session.commit()

    def follower_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "image": self.image,
            "comments": [comment.to_dict() for comment in self.comments]
        }
    

    def user_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "image": self.image,
            "favorites": [fav.to_dict() for fav in self.favorites],
            "comments": [comment.to_dict() for comment in self.comments],
            "followers": [follower.follower_dict() for follower in self.followers],
            "following": [following.follower_dict() for following in self.following]
        }
        


    @hybrid_property
    def password_hash( self ):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode( 'utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key = True)

    title = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    genre = db.Column(db.String, nullable = False)
    platform = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)

    comments = db.relationship('Comment', backref = 'game')

    @validates('title', 'genre', 'image', 'platform')
    def validate_game_info(self, key, value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        return value
    
    @validates('price')
    def validate_price(self, key, value):
        try:
            float(value)
        except ValueError:
            raise ValueError('Price must be a float.')
        return value
    

    # def game_dict(self):
    #     return {
    #         "id": self.id,
    #         "title": self.title,
    #         "image": self.image,
    #         "genre": self.genre,
    #         "platform": self.platform,
    #         "price": self.price,
    #         "comments": [comment.to_dict() for comment in self.comments]
    #     }


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-user', '-game', )

    id = db.Column(db.Integer, primary_key = True)

    score = db.Column(db.Integer)
    content = db.Column(db.String)
    game_name = db.Column(db.String)
    game_image = db.Column(db.String)
    user_username = db.Column(db.String)
    user_image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    replies = db.relationship('CommentReply', back_populates='comment', lazy=True, cascade='all, delete')

    # def comment_dict(self):
    #     return {
    #         "id": self.id,
    #         "score": self.score,
    #         "content": self.content,
    #         "game_name": self.game_name,
    #         "game_image": self.game_image,
    #         "user_username": self.user_username,
    #         "user_image": self.user_image,
    #         "created_at": self.created_at,
    #         "updated_at": self.updated_at,
    #         "replies": [reply.reply_dict() for reply in self.replies]
    #     }

    @validates('content', 'game_name', 'game_image', 'user_username', 'user_image')
    def validate_comment(self,key,value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        return value
    @validates ('score')
    def validate_comment_score(self, key, value):
        if value < 1 or value > 10:
            raise ValueError('Score must be within 1 and 10.')
        return value
    
class CommentReply(db.Model, SerializerMixin):
    __tablename__ = 'comment_replies'

    serialize_rules = ( '-comment', '-user', )

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    user_username = db.Column(db.String, default='unknown', nullable = False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable = False)
    reply = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', backref='comment_replies')

    comment = db.relationship('Comment', back_populates='replies')


    @validates('reply')
    def validate_reply(self, key, value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        return value
    
    # def reply_dict(self):
    #     return {
    #         "id": self.id,
    #         "user_id": self.user_id,
    #         "comment_id": self.comment_id,
    #         "reply": self.reply,
    #         "created_at": self.created_at,
    #         "updated_at": self.updated_at
    #     }


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-game.favorites', '-user',)

    id = db.Column(db.Integer, primary_key = True)

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_image = db.Column(db.String, nullable = False)
    game_title = db.Column(db.String, nullable = False)

    @validates('game_image', 'game_title')
    def validate_favorite(self, key, value):
        if len(value) < 1:
            raise ValueError('Field cannot be empty.')
        return value
