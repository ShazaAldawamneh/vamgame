from flask_wtf import FlaskForm
from wtforms import SubmitField, SelectField,BooleanField,IntegerField,PasswordField,StringField,DecimalField
from wtforms.fields.html5 import DateField
from wtforms.validators import InputRequired, NumberRange, EqualTo
from decimal import ROUND_HALF_UP


class passwordForm(FlaskForm):
    user_id = StringField("User id:", validators=[InputRequired()])
    oldPassw = PasswordField("Old password:", validators=[InputRequired()])
    newPassw = PasswordField("new password:", validators=[InputRequired()])
    newPassw2 = PasswordField("new password again:",validators=[InputRequired(),EqualTo("newPassw")])
    submit = SubmitField("Submit")

class RegistrationForm(FlaskForm):
    user_id = StringField("User id:", validators=[InputRequired()])
    password = PasswordField("Password1:", validators=[InputRequired()])
    password2 = PasswordField("Password:",
     validators=[InputRequired(),EqualTo("password")])
    submit = SubmitField("Submit")

class LoginForm(FlaskForm):
    user_id = StringField("User id:", validators=[InputRequired()])
    password = PasswordField("Password:", validators=[InputRequired()])
    submit = SubmitField("Submit")
