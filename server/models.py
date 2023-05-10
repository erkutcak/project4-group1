from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

#db = SQLAlchemy()

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    serialize_rules = ('-id', '-created_at', '-updated_at', '-user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.String)
    for_sale = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('shopping_carts.id')) 
    #transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'), nullable=True)


    #transaction = db.relationship('Transaction', backref='item', cascade='all, delete, delete-orphan')
    # shoppingcart2 = db.relationship('ShoppingCart', backref='items')
    #users = association_proxy('items', 'user')


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-transactions', '-items', '-cart', '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    #transactions = db.relationship('Transaction', backref='user', cascade='all, delete, delete-orphan')
    items = db.relationship('Item', backref='user', cascade='all, delete, delete-orphan')
    cart = db.relationship('ShoppingCart', uselist=False, backref='user', cascade='all, delete, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    


class ShoppingCart(db.Model, SerializerMixin):
    __tablename__ = 'shopping_carts'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # items = db.relationship('Item', backref='shoppingcart', cascade='all, delete, delete-orphan')
    items = association_proxy('shopping_carts', 'item')
    # transaction = db.relationship('Transaction', backref='shoppingcart', cascade='all, delete, delete-orphan')
    

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    serialize_rules = ('-items', '-users', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
