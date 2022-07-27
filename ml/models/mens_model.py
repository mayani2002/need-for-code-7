import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import pickle
import json

data = pd.read_csv('C:/Users/hp/Documents/need-for-code-7/ml/data/men.csv')

row_subcategory_drop = ['Henley Shirts', 'Slips', 'Pantalons', 'Shorts de bain', 'Cardigans', 'Vestes','Tanks', 'Gilets', 'Jumpsuits',  'Débardeurs', 'Bas', 'Doudounes & Parkas', 'Bottoms', 'Golf Shirts', 'Tops', 'Caleçons longs', 'SOUS-VÊTEMENTS', 'Robes', 'Waistcoats', 'MAILLOTS DE BAIN', 'Onesies', 'VESTES & MANTEAUX', 'Polos', 'PULLS & GILETS', 'PANTALONS & SHORTS', 'TOPS', 'Pantalons de jogging', 'Manteaux']


 
drop_cloumns = ['discount', 'currency', 'brand', 'brand_url', 'codCountry', 'variation_0_color', 'variation_1_color', 'variation_0_thumbnail', 'variation_0_image', 'variation_1_thumbnail', 'variation_1_image', 'image_url', 'model', 'url']

df = data.drop(drop_cloumns, axis=1)
 
for i in range(len(row_subcategory_drop)):
    index_names = df[ df['subcategory'] == row_subcategory_drop[i] ].index
    df.drop(index_names, inplace = True)
 
likes_features_df = df.pivot_table(index='name', columns='subcategory', values=['likes_count','current_price', 'is_new', 'raw_price']).fillna(0)
likes_features_df_matrix = csr_matrix(likes_features_df.values)
 
# model_kids_knn = NearestNeighbors(metric='cosine', algorithm='brute')
# model_kids_knn.fit(likes_features_df_matrix)
model_men_knn = pickle.load(open('C:/Users/hp/Documents/need-for-code-7/ml/models/men_model.pkl', 'rb'))
 
# query_index = np.random.choice(likes_features_df.shape[0])
# print(query_index)

def getSimilarMenProducts(productName):
    query_index = 0
    for i in range(likes_features_df.index.shape[0]):
        if likes_features_df.index[i] == productName:
            query_index = i
    
    distances, indices = model_men_knn.kneighbors(likes_features_df.iloc[query_index, :].values.reshape(1,-1), n_neighbors=11)

    
    ls = {}
    for i in range(0, len(distances.flatten())):
        if i == 0:
            print("Recommendations for {0}".format(likes_features_df.index[query_index]))
        else:
            print("{0}: {1}, with distance of {2}".format(i, likes_features_df.index[indices.flatten()[i]], distances.flatten()[i]))
            ls[i] = likes_features_df.index[indices.flatten()[i]]
    
    print(ls)
    new_ls = data['name'].isin(ls.values())
    similarProducts = data[new_ls]
    print(similarProducts)

    return similarProducts.to_json(orient='records')

