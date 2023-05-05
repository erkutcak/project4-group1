from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

db = SQLAlchemy()

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    serialize_rules = ()

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

    transaction = db.relationship('Transaction', backref='item', cascade='all, delete, delete-orphan')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    cart = db.relationship('ShoppingCart', backref='user', cascade='all, delete, delete-orphan')
    items = db.relationship('Item', backref='user', cascade='all, delete, delete-orphan')
    transactions = association_proxy('items', 'transaction')

class ShoppingCart(db.Model, SerializerMixin):
    __tablename__ = 'shopping_carts'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    items = db.relationship('Item', backref='shoppingcart', cascade='all, delete, delete-orphan')
    transaction = db.relationship('Transaction', backref='shoppingcart', cascade='all, delete, delete-orphan')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('items.user_id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('shopping_carts.user_id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
