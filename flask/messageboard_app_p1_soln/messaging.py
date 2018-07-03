from flask import Flask, request, abort, url_for, redirect, session, Blueprint, render_template, jsonify
from model import User, Blogpost, db
from datetime import datetime
from sqlalchemy import desc


messaging_blueprint = Blueprint('messaging', __name__, template_folder = 'templates')
@messaging_blueprint.route("/profile/", methods = ["GET", "POST"])
@messaging_blueprint.route("/profile/<username>", methods = ["GET", "POST"])
def profile(username=None):
	posts = get_posts();
	
	if request.method =="GET":
	    if not username:#no username given in url
	        if "username" in session: #no user in session
	            return redirect(url_for('messaging.profile', username=session["username"]))
	        else:#user needs to login
	            return redirect(url_for("account.logger"), username = None)
	    else:#username given
	        if "username" in session and session["username"] == username:
	            user = get_user(username)
	            return render_template("profile.html", user = user, posts = posts)
	        else:
	            return render_template("anonymousUser.html", name=username, posts = posts)
	
	elif request.method =="POST":
	    """
	    TODO: add template form that will allow for posting a new message
	    TODO: add template form that allows for deleting a message of only the current user
	    TODO: add to posts dictionary content related to the post, should be passed from get post method
	    if request.method == "POST":
	        	        

	        return redirect(url_for('messaging.profile'))
	    """
	    user = get_user(session['username'])
	    op = request.form['op']
	    if op == 'ADD' and request.form['text'] and request.form['title']:
	        add_post(user, request.form)
	    elif op=='DELETE':
	        delete_post(request.form['id'])   
	    posts = get_posts();
	    
	    return render_template("profile.html", user = user, posts = posts)	    

def get_user(username):
    return User.query.filter_by(username = username).first()

def delete_post(id):
    """
    TODO: deletes the post in the model
    """
    to_del = Blogpost.query.get(id)
    db.session.delete(to_del)
    db.session.commit()
	
def add_post(user, data):
    """
    TODO: adds the post to the model
    """
    post = Blogpost(user.id, data['title'], data['text'], datetime.now())
    response = db.session.add(post)
    db.session.commit()
    
    
def get_posts():
    """
    TODO: returns posts
    """
    return Blogpost.query.order_by(desc(Blogpost.date)).all()
    
    
    
    
    
    
    
    
    
    
    
    
    