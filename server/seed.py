#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Item, User, ShoppingCart, Transaction


fake = Faker()

def create_users():
    x = []
    for i in range(10):
        user = User(
            email= fake.email(),
            username= fake.user_name(),
            password= fake.password()
        )
        # db.session.add(user)
        # db.session.commit()
        # print(f"Created user {user['username']}")
        x.append(user)
    return x

def create_items():
    x = []
    for i in range(10):
        item = Item(
            name= fake.name(),
            description= fake.text(),
            price= randint(100, 10000),
            category= rc(fake.text()),
            image= fake.image_url(),
            user_id= randint(1, 100),
            updated_at= fake.date_time_this_year(),
            created_at= fake.date_time_this_year(),
            for_sale= randint(0, 1)
        )
        x.append(item)
    return x

def create_shopping_cart():
    x = []
    for i in range(10):
        item = ShoppingCart(
            user_id= randint(1, 100),
        )
        x.append(item)
    return x
def create_transactions():
    x = []
    for i in range(10):
        item = Transaction(
            seller_id= randint(1, 100),
            buyer_id= randint(1, 100),
            item_id= randint(1, 100),
        )
        x.append(item)
    return x

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print('Clearing database...')
        User.query.delete()
        Item.query.delete()
        ShoppingCart.query.delete()
        Transaction.query.delete()

        print("Seeding User...")
        user = create_users()
        db.session.add_all(user)
        db.session.commit()

        print("Seeding Item...")
        item = create_items()
        db.session.add_all(item)
        db.session.commit()

        print("Seeding ShoppingCart...")
        shoppingCart = create_shopping_cart()
        db.session.add_all(shoppingCart)
        db.session.commit()

        print("Seeding Transaction...")
        transaction = create_transactions()
        db.session.add_all(transaction)
        db.session.commit()

        print("Done Seeding!")