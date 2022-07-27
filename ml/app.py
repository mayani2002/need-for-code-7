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

kidsData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/kids.csv')
menData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/men.csv')
womenData = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/women.csv')
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

    if categoryRequested == "kids":
        # kidsData.sort_values(by=['likes_count'], ascending=False)
        return kidsData.sort_values(by=['likes_count'], ascending=False).to_json(orient='records')
    elif categoryRequested == "men":
        # menData.sort_values(by=['likes_count'], ascending=False)
        return menData.sort_values(by=['likes_count'], ascending=False).to_json(orient='records')
    elif categoryRequested == "women":
        # womenData.sort_values(by=['likes_count'], ascending=False)
        return womenData.sort_values(by=['likes_count'], ascending=False).to_json(orient='records')
    elif categoryRequested == "shoes":
        # shoesData.sort_values(by=['likes_count'], ascending=False)
        return shoesData.sort_values(by=['likes_count'], ascending=False).to_json(orient='records')
    
    return productsData


# def getProducts():
#     productsData = "Data Not Available"
#     print("Request Recieved!")
#     # recievedData = request.json
#     categoryRequested = "shoes"

#     if categoryRequested == "kids":
#         # kidsData.sort_values(by=['likes_count'], ascending=False)
#         print(json.dumps(kidsData.sort_values(by=['likes_count'], ascending=False).to_numpy().tolist()))
#     elif categoryRequested == "men":
#         # menData.sort_values(by=['likes_count'], ascending=False)
#         print(json.dumps(menData.sort_values(by=['likes_count'], ascending=False).to_numpy().tolist()))
#     elif categoryRequested == "women":
#         # womenData.sort_values(by=['likes_count'], ascending=False)
#         print(json.dumps(womenData.sort_values(by=['likes_count'], ascending=False).to_numpy().tolist()))
#     elif categoryRequested == "shoes":
#         # shoesData.sort_values(by=['likes_count'], ascending=False)
#         print(json.dumps(shoesData.sort_values(by=['likes_count'], ascending=False).to_numpy().tolist()))
    
#     print(productsData)




if __name__ == "__main__":
    app.run(debug = True)