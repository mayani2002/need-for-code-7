import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import pickle
import json

data = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/shoes.csv')
 
drop_cloumns = ['discount', 'currency', 'brand', 'brand_url', 'codCountry', 'variation_0_color', 'variation_1_color', 'variation_0_thumbnail', 'variation_0_image', 'variation_1_thumbnail', 'variation_1_image', 'image_url', 'model', 'url']

df = data.drop(drop_cloumns, axis=1)

df.dropna(inplace=True)
 
likes_features_df = df.pivot_table(index='name', columns='subcategory', values=['likes_count','current_price', 'is_new', 'raw_price']).fillna(0)
likes_features_df_matrix = csr_matrix(likes_features_df.values)
 
# model_kids_knn = NearestNeighbors(metric='cosine', algorithm='brute')
# model_kids_knn.fit(likes_features_df_matrix)
model_shoes_knn = pickle.load(open('C:/Users/hp/Documents/need-for-code-7/ml/models/shoes_model.pkl', 'rb'))
 
# query_index = np.random.choice(likes_features_df.shape[0])
# print(query_index)

def getSimilarShoesProducts(productName):
    query_index = 0
    for i in range(likes_features_df.index.shape[0]):
        if likes_features_df.index[i] == productName:
            query_index = i
    
    distances, indices = model_shoes_knn.kneighbors(likes_features_df.iloc[query_index, :].values.reshape(1,-1), n_neighbors=11)

    
    ls = []
    for i in range(0, len(distances.flatten())):
        if i == 0:
            print("Recommendations for {0}".format(likes_features_df.index[query_index]))
        else:
            print("{0}: {1}, with distance of {2}".format(i, likes_features_df.index[indices.flatten()[i]], distances.flatten()[i]))
            ls.append(likes_features_df.index[indices.flatten()[i]])
    
    new_ls = data['name'].isin(ls)
    similarProducts = data[new_ls]

    return json.dumps(ls)
