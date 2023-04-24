from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User (db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-comments.user')

    id = db.Column( db.Integer, primary_key = True )

    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_date = db.Column(db.String, nullable=False)
    username = db.Column( db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    _password_hash = db.Column( db.String, nullable = False )
    confirm_password = db.Column(db.String, nullable = False)

    comments = db.relationship('Comment', backref='user')


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

    serialize_rules = ('-comments.game',)

    id = db.Column(db.Integer, primary_key = True)

    title = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    genre = db.Column(db.String, nullable = False)
    platform = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)

    comments = db.relationship('Comment', backref = 'game')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-game.comments', '-user.comments',)

    id = db.Column(db.Integer, primary_key = True)

    score = db.Column(db.Integer)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))