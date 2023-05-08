#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from config import app, db, api
from models import User, ShoppingCart
# from models import User, Recipe

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)


class Users(Resource):
    def get(self):
        u_list = [u.to_dict() for u in User.query.all()]
        if len(u_list) == 0:
            return make_response({'error': 'no Users'}, 404)
        return make_response(u_list, 200)
    
    def post (self):
        data = request.get_json()
        newUser = User(
            username= data["username"],
            password = data["password"]
            )
        try:
            db.session.add(newUser)
            db.session.commit()
            return make_response (newUser.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)
        
api.add_resource(Users, '/users')

class ShoppingCart(Resource):
    def get(self):
        sc_list = [sc.to_dict() for sc in ShoppingCart.query.all()]
        if len(sc_list) == 0:
            return make_response({'error': 'no Customers'}, 404)
        return make_response(sc_list, 200)
    
    def post (self):
        data = request.get_json()
        newShoppingCart = ShoppingCart(
            id = data["id"],
            user_id = data["user_id"]
            )
        try:
            db.session.add(newShoppingCart)
            db.session.commit()
            return make_response (newShoppingCart.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)

api.add_resource(ShoppingCart, '/shoppingcarts')



# Local imports

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)
