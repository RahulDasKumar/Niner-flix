#!/usr/bin/env python3

from authentication.authTools import login_pipeline, update_passwords, hash_password
from database.db import Database
from flask import Flask, flash, jsonify, render_template, request
from core.session import Sessions

app = Flask(__name__)
app.secret_key = b'7Zwe3_34rteff'
HOST, PORT = 'localhost', 8080
global username, products, db, sessions
username = 'default'
db = Database('database/storeRecords.db')
products = db.get_full_inventory()
sessions = Sessions()
sessions.add_new_session(username, db)


@app.route('/')
def index_page():
    """
    Renders the index page when the user is at the `/` endpoint, passing along default flask variables.

    args:
        - None

    returns:
        - None
    """
    return render_template('index.html', username=username, products=products, sessions=sessions)


@app.route('/login')
def login_page():
    """
    Renders the login page when the user is at the `/login` endpoint.

    args:
        - None

    returns:
        - None
    """
    return render_template('login.html')


@app.route('/home', methods=['POST'])
def login():
    """
    Renders the home page when the user is at the `/home` endpoint with a POST request.

    args:
        - None

    returns:
        - None

    modifies:
        - sessions: adds a new session to the sessions object

    """
    error = None
    username = request.form['username']
    password = request.form['password']
    if login_pipeline(username, password):
        print("login")
        sessions.add_new_session(username, db)
        return render_template('home.html', products=products, sessions=sessions)
    else:
        print(f"Incorrect username ({username}) or password ({password}).")
        flash("Incorrect username or password.", 'error')
    return render_template('login.html', uname=username)


@app.route('/register')
def register_page():
    """
    Renders the register page when the user is at the `/register` endpoint.

    args:
        - None

    returns:
        - None
    """
    return render_template('register.html')


@app.route('/register', methods=['POST'])
def register():
    """
    Renders the index page when the user is at the `/register` endpoint with a POST request.

    args:
        - None

    returns:
        - None

    modifies:
        - passwords.txt: adds a new username and password combination to the file
        - database/storeRecords.db: adds a new user to the database
    """
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    salt, key = hash_password(password)
    update_passwords(username, key, salt)
    db.insert_user(username, key, salt, email, first_name, last_name)
    return render_template('index.html')


@app.route('/checkout', methods=['POST'])
def checkout():
    """
    Renders the checkout page when the user is at the `/checkout` endpoint with a POST request.

    args:
        - None

    returns:
        - None

    modifies:
        - sessions: adds items to the user's cart
    """
    order = {}
    user_session = sessions.get_session(username)
    for item in products:
        print(f"item ID: {item['id']}")
        if request.form[str(item['id'])] > '0':
            count = request.form[str(item['id'])]
            order[item['item_name']] = count
            user_session.add_new_item(
                item['id'], item['item_name'], item['price'], count)

    user_session.submit_cart()

    return render_template('checkout.html', order=order, sessions=sessions, total_cost=user_session.total_cost)

@app.route('/movies', methods=['GET'])
def get_movies():
    movies = db.get_all_movies()
    return jsonify(movies)

@app.route('/movies/<genre>', methods=['GET'])
def get_movies_by_genre(genre):
    movies = db.select_by_genre(genre)
    return jsonify(movies)

@app.route('/movies/title/<title>',methods=['GET'])
def get_movie_by_title(title):
    movies = db.select_by_title(title)
    return jsonify(movies)

@app.route('/movies/rating/<order>',methods=['GET'])
def get_movie_by_rating(order):
    if order == 'ASC':
        movies = db.select_by_rating_asc()
        return jsonify(movies)
    elif order == 'DESC':
        movies = db.select_by_rating_desc()
        return jsonify(movies)
    else: 
        return 'Wrong endpoint, use ASC or DESC'


if __name__ == '__main__':
    app.run(debug=True, host=HOST, port=PORT)
