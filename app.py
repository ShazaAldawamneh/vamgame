

from flask import Flask, render_template, request,redirect, url_for, session, g
from database import get_db, close_db
from flask_session import Session
from datetime import datetime, timedelta
from forms import  RegistrationForm,LoginForm,passwordForm
from werkzeug.security import generate_password_hash, check_password_hash  
from functools import wraps
app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-my-secret-key"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.teardown_appcontext
def close_db_at_end_of_request(e =None):
    close_db(e)

@app.before_request
def load_logged_in_user():
    g.user = session.get("user_id", None)

def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(**kwargs)
    return wrapped_view

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()
        if db.execute("""SELECT * FROM users WHERE user_id = ?""",(user_id,)).fetchone() is not None:
            db.execute("""SELECT * FROM users WHERE user_id = ?""", (user_id,)).fetchone()
            form.user_id.errors.append("This username is already used")
        else:
            db.execute("""INSERT INTO users(user_id, password)
                            VALUES (?,?)""",(user_id, generate_password_hash(password)))
            db.commit()
        return redirect(url_for('login'))
    return render_template("register.html",form = form)

@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm() 
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()
        user = db.execute("""SELECT * FROM users
                    WHERE user_id = ?;""", (user_id,)).fetchone()
        if user is None:
            form.user_id.errors.append("Unknown user id")
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("incorrect password!")
        else:
            session["user_id"] = user_id
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
    return render_template("login.html", form = form)


@app.route("/reset", methods=["GET","POST"])
def reset():
    form = passwordForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        oldPassw = form.oldPassw.data
        newPassw = form.newPassw.data
        newPassw2 = form.newPassw2.data
        db = get_db()
        user = db.execute("""SELECT * FROM users
            WHERE user_id = ?;""", (user_id,)).fetchone()
        if user is None:
            form.user_id.errors.append("Unknown user id")
        else:
            if check_password_hash(user["password"], oldPassw):
                if not newPassw == newPassw2:
                    form.newPassw2.errors.append("Passwords do not match.")
                else:
                    db.execute("""UPDATE users
                                SET password = ?
                                WHERE user_id = ?;""",((generate_password_hash(newPassw)), user_id))
                    db.commit()
                    return redirect(url_for("login"))
            else:
                form.oldPassw.errors.append("incorrect Old password!")
    return render_template("reset.html", form=form)
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('index'))



@app.route("/game")
@login_required
def game():
    user_id = session["user_id"]
    return render_template("game.html")


@app.route("/store_scores", methods = ["POST"])
@login_required

def store_scores():
    user_id = session["user_id"]
    num_killed_player = request.json["num_killed_player"]
    num_killed_mon = request.json["num_killed_mon"]
    level = request.json["level"]
    db = get_db()
    if db.execute("""SELECT * FROM userScores WHERE user_id = ?""",(user_id,)).fetchone() is not None:
        db.execute("""UPDATE userScores 
                        SET num_killed_player = ?, num_killed_mon= ?, level = ? 
                        WHERE user_id = ?""", (num_killed_player, num_killed_mon, level,user_id,))

    else:
        db.execute("""INSERT INTO userScores(user_id,num_killed_player,num_killed_mon, level)
                    VALUES (?,?,?,?)""",(user_id,num_killed_player,num_killed_mon, level))
    db.commit()
    return "success"
    #db.execute("""INSERT INTO userScores(user_id,num_killed_player,num_killed_mon, level)
    #           VALUES (?,?,?,?)""",(user_id,num_killed_player,num_killed_mon, level))

@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    user_id = session["user_id"]

    db = get_db()
    user_scores = db.execute("""SELECT * FROM userScores
        WHERE user_id=?""",(user_id,)).fetchone()

    return render_template("profile.html", user_scores = user_scores)

@app.route("/lb", methods=["GET", "POST"])
def lb():
    db = get_db()
    users_scores = db.execute("""SELECT * FROM userScores
                                ORDER BY level DESC""").fetchall()

    return render_template("lb.html", users_scores = users_scores)