# Importing required libraries
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
from models import kids_model
from models import mens_model
from models import women_model
from models import shoes_model

# Creating a Flask App
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Predicting the results based on user's answers
@app.route("/GetSimilarProducts", methods = ["GET"])
@cross_origin()
def getSimilarProducts():
    print("Request Recieved")
    recievedData = request.json
    productCategory = recievedData["Category"]
    
    if productCategory == "Men":
        similarProducts = mens_model.getSimilarMenProducts(recievedData["Name"])
    elif productCategory == "Women":
        similarProducts = women_model.getSimilarWomenProducts(recievedData["Name"])
    elif productCategory == "Kids":
        similarProducts = kids_model.getSimilarKidsProducts(recievedData["Name"])
    elif productCategory == "Shoes":
        similarProducts = shoes_model.getSimilarShoesProducts(recievedData["Name"])

    return similarProducts

if __name__ == "__main__":
    app.run(debug = True)