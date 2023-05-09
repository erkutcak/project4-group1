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
        )
        user.password_hash = fake.password()
        # db.session.add(user)
        # db.session.commit()
        # print(f"Created user {user['username']}")
        x.append(user)
    return x

def create_items():
    # Item.query.delete()
    i1= Item(name='Black Velvet Couch', category='furniture and decor', price=148.99, description='Black Velvet Couch, great for lounging.', for_sale=True, user_id=1, cart_id=1)
    i2= Item(name='White Microfiber Towel', category='household items', price=8.98, description='Microfiber Bath Towel', for_sale=True, user_id=2)
    i3= Item(name='Nutella', category='food/beverage', price=30.49, description='10lb tub of Nutella', for_sale=True, user_id=3)
    i4= Item(name='Native Face Cleanser', category='beauty/health', price=18.99, description='Rose scented face cleanser for women', for_sale=True, user_id=3)
    i5= Item(name='Dog Bowl Food/Water Set', category='pet supplies', price=45.00, description='Matching placemats and food/water bowls for pets', for_sale=True, user_id=4)
    i6= Item(name='Wood L-Shaped Desk', category='office equipment', price=180.49, description='48 inch deep, L-shaped office desk', for_sale=True, user_id=5)
    i7= Item(name='Harry Potter Book Series', category='books', price=90.99, description='Harry Potter collection series', for_sale=True, user_id=6)
    i8= Item(name='Soccer Ball', category='sports', price=19.99, description='Champions League ball, like new!', for_sale=True, user_id=7)
    i9= Item(name='iPhone 14 Pro Max', category='electronics', price=999.99, description='Deep Purple 128GB in good shape', for_sale=True, user_id=7)
    i10= Item(name='LG UltraWide Monitor', category='electronics', price=500, description='34-inch ultra wide screen mint condition', for_sale=True, user_id=8)
    i11= Item(name='Printer', category='office equipment', price=59.99, description='A white multi color printer for sale', for_sale=True, user_id=9)
    i12= Item(name='Ferrari Lego', category='toys', price=499.99, description='Ferrari Daytona SP3 Lego Technic, brand new', for_sale=True, user_id=10)
    i13= Item(name='Steering Wheel Cover', category='auto parts', price=29.99, description='wheel cover made of syntethic rubber and viscose, feels smooth!', for_sale=True, user_id=11)

    item = [i1, i2, i3, i4, i5, i6 , i7, i8, i9, i10, i11, i12, i13]
    return item

def create_shopping_cart():
    x = []
    for i in range(13):
        item = ShoppingCart(
            user_id= randint(1, 100),
        )
        x.append(item)
    return x
def create_transactions():
    x = []
    for i in range(13):
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