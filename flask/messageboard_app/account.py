from flask import Flask, request, abort, url_for, redirect, session, render_template, Blueprint, flash
from model import User, db

account_blueprint = Blueprint('account', __name__, template_folder = 'templates')

# by default, direct to login
@account_blueprint.route("/")
def default():
	return redirect("/login/")


@account_blueprint.route("/login/", methods = ["GET", "POST"])
def logger():
    #user logged in?
    if "username" in session:
        return redirect(url_for("messaging.profile", username = session["username"]))
    # if not, and the incoming request is via POST try to log them in
    elif request.method == "POST":
        user = User.query.filter_by(username = request.form['user']).first()
        if user != None and user.password == request.form['pass']:
            session['username'] = user.username        
            return redirect(url_for("messaging.profile", username=session["username"]))            
        else:
            return render_template("loginPage.html", error="Incorrect username or password")
    # otherwise, offer to log them in
    return render_template("loginPage.html")

@account_blueprint.route("/logout/")
def unlogger():
	# if logged in, log out, otherwise offer to log in
	if "username" in session:
		# note, here were calling the .clear() method for the python dictionary builtin
		session.clear()
		return render_template("logoutPage.html")
	else:
		return redirect(url_for("account.logger"))

"""
    Register New User
"""
@account_blueprint.route("/register/", methods = ["GET", "POST"])
def register():
	# if logged in, redirect to user page
	error = None
	if "username" in session:
		return redirect(url_for("messaging.profile"))
	elif request.method == "POST":
	    user = User(request.form['user'], request.form['pass'], 
	                request.form['fname'], request.form['lname'])    
	    response = db.session.add(user)
	    db.session.commit()
	    return redirect(url_for("account.logger"))
	return render_template("register.html")
