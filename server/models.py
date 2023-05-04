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

    serialize_rules = ('-comments.user.password_hash', '-favorites.user.password_hash', '-followers',)


    id = db.Column( db.Integer, primary_key = True )

    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_date = db.Column(db.String, nullable=False)
    username = db.Column( db.String, unique = True, nullable = False)
    image = db.Column(db.String, nullable = False)
    _password_hash = db.Column( db.String, nullable = False )
    confirm_password = db.Column(db.String, nullable = False)

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
            "followers": [follower.to_dict() for follower in self.followers],
            "following": [following.to_dict() for following in self.following]
        }

    # def is_following(self, user):
    #     return self.followers.filter(followers.c.follower_id == user.id).count() > 0


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

    serialize_rules = ('-comments.game', '-favorites.game',)

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


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-game.comments', '-user.comments', '-game.favorites',)

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


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-game.favorites', '-user.favorites', '-user.comments',)

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
