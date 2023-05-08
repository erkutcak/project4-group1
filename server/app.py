#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from config import app, db, api
from models import Item, User, ShoppingCart, Transaction
# from models import User, Recipe

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)


class Items(Resource):
    def get(self):
        i_list = [i.to_dict() for i in Item.query.all()]
        if len(i_list) == 0:
            return make_response({'error': 'no Items'}, 404)
        return make_response(i_list, 200)
    
    def post (self):
        data = request.get_json()
        newItem = Item(
            id = data["id"],
            name = data["name"],
            category = data["category"],
            price = data["price"],
            image = data["image"],
            description = data["description"],
            for_sale = data["for_sale"]
            )
        try:
            db.session.add(newItem)
            db.session.commit()
            return make_response (newItem.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)
        
api.add_resource(Items, '/items')


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



class ShoppingCarts(Resource):
    def get(self):
        sc_list = [sc.to_dict() for sc in ShoppingCart.query.all()]
        if len(sc_list) == 0:
            return make_response({'error': 'no Carts'}, 404)
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

api.add_resource(ShoppingCarts, '/shoppingcarts')



class TransactionsById(Resource):
    def get(self, id):
        t = Transaction.query.filter_by(id = id).first()
        if t == None:
            return make_response({'error': 'no Transactions'}, 404)
        return make_response(t.to_dict(), 200)
    def delete(self, id):
        t = Transaction.query.filter_by(id = id).first()
        db.session.delete(t)
        db.session.commit()
        response_body = {
            "deleted successfully": True,
            "message": "Transaction deleted successfully"
        }
        response = make_response(
            response_body,
            202
        )
        return response
    def patch(self, id):
        try:
            t = Transaction.query.filter_by(id = id).first()

            for attr in request.get_json():
                setattr(t, attr, request.get_json()[attr])
        except:
            response_body = {
                'error': 'no transaction'
            }
            return make_response( response_body, 404 )
        else:
            db.session.add(t)
            db.session.commit()
        
        return make_response(t.to_dict(), 200)
    
api.add_resource(TransactionsById, '/transactions/<int:id>')

class Transactions(Resource):
    def get(self):
        t_list = [t.to_dict() for t in Transaction.query.all()]
        if len(t_list) == 0:
            return make_response({'error': 'no Transactions'}, 404)
        return make_response(t_list, 200)
    def post (self):
        data = request.get_json()
        newTransaction = Transactions(
            id= data["id"],
            seller_id = data["seller_id"], 
            buyer_id = data["buyer_id"],
            item_id = data["item_id"]
            )
        try:
            db.session.add(newTransaction)
            db.session.commit()
            return make_response (newTransaction.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': f'{repr(e)}'}, 422)
        
api.add_resource(Transactions, '/transactions')

# Local imports

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)
