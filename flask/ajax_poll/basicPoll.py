import json
from flask import Flask, render_template, request

app = Flask(__name__)

items = [["FIRST NAME - ", "LAST NAME - ", "FLAVOR"]]
choices = ["vanilla", "chocolate", "strawberry"]

@app.route("/")
def default():
	return render_template("poll.html", items=items, flavors = choices)

@app.route("/new_item", methods=["POST"])
def add():
    form = request.json
    if form['flavor'] not in choices:   
        choices.append(form['flavor'])
    items.append([form["first"], form["last"], form["flavor"]])
    return "OK!"

@app.route("/items")
def get_items():
    return json.dumps({'choices': choices,'results': items})
	
if __name__ == "__main__":
	app.run(debug = True)

