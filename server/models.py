from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime



class Follow(db.Model, SerializerMixin):
    __tablename__ = "follows"

    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key = True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key = True)

    timestamp = db.Column(db.DateTime, default=datetime.utcnow)



class User (db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-comments.user', '-favorites.user',)

    id = db.Column( db.Integer, primary_key = True )

    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_date = db.Column(db.String, nullable=False)
    username = db.Column( db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    _password_hash = db.Column( db.String, nullable = False )
    confirm_password = db.Column(db.String, nullable = False)

    comments = db.relationship('Comment', backref='user', cascade='all, delete')
    favorites = db.relationship('Favorite', backref='user', cascade='all, delete')


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
    

    followed = db.relationship('Follow',
                               foreign_keys=[Follow.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    followers = db.relationship('Follow',
                                foreign_keys=[Follow.followed_id],
                                backref=db.backref('followed', lazy='joined'),
                                lazy='dynamic',
                                cascade='all, delete-orphan')



class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    serialize_rules = ('-comments.game', '-favorites.game',)

    id = db.Column(db.Integer, primary_key = True)

    title = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    genre = db.Column(db.String, nullable = False)
    platform = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    favorite = db.Column(db.Boolean, nullable = False, default = False)

    comments = db.relationship('Comment', backref = 'game')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-game.comments', '-user.comments',)

    id = db.Column(db.Integer, primary_key = True)

    score = db.Column(db.Integer)
    content = db.Column(db.String)
    game_name = db.Column(db.String)
    user_username = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-game.favorites', '-user.favorites',)

    id = db.Column(db.Integer, primary_key = True)

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_image = db.Column(db.String, nullable = False)
    game_title = db.Column(db.String, nullable = False)




