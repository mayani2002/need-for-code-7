# Importing required libraries
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
from models import kids_model
from models import mens_model
from models import women_model
from models import shoes_model
import json

kidsData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/df_kids.csv')
menData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/df_men.csv')
womenData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/df_women.csv')
shoesData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/shoes.csv')

# Creating a Flask App
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Predicting the results based on product category
@app.route("/GetSimilarProducts", methods = ["GET"])
@cross_origin()
def getSimilarProducts():
    similarProducts = "Data Not Available"

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


# Predicting the results based on product category
@app.route("/GetAllProducts", methods = ["POST"])
@cross_origin()
def getAllProducts():
    productsData = "Data Not Available"
    print("Request Recieved!")
    recievedData = request.json
    categoryRequested = recievedData["Category"]

    if categoryRequested == "Kids":
        # kidsData.sort_values(by=['likes_count'], ascending=False)
        return kidsData.to_json(orient='records')
    elif categoryRequested == "Men":
        # menData.sort_values(by=['likes_count'], ascending=False)
        return menData.to_json(orient='records')
    elif categoryRequested == "Women":
        # womenData.sort_values(by=['likes_count'], ascending=False)
        return womenData.to_json(orient='records')
    elif categoryRequested == "Shoes":
        # shoesData.sort_values(by=['likes_count'], ascending=False)
        return shoesData.sort_values(by=['likes_count'], ascending=False).to_json(orient='records')
    
    return productsData


if __name__ == "__main__":
    app.run(debug = True)