from flask.ext.sqlalchemy import SQLAlchemy #if this fails it may need to be called as import flask_sqlalchemy instead of flask.ext.sqlalchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    posts = db.relationship('Blogpost', backref = 'user', lazy = 'dynamic')
    
    def __init__(self, username, password, fname, lname):
        self.username = username
        self.first_name = fname
        self.last_name = lname
        self.password = password
    
    def __repr__(self):
        return '<User - {}>'.format(self.username)
    
        
class Blogpost(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    text = db.Column(db.Text())
    date = db.Column(db.DateTime())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def __init__(self, user_id, title, text, date):
        self.user_id = user_id
        self.title = title
        self.text = text
        self.date = date
        
    def __repr__(self):
        return '<Blogpost - {}>'.format(self.title)
     
    def serialize(self):
        if self.user_id != None:
            user = User.query.get(self.user_id)
            return {
                'id': self.id,
                'username' : user.username,
                'fname' : user.first_name,
                'title' : self.title,
                'text' : self.text,
                'date' : self.date.replace(microsecond=0)
            }
            
