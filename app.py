from flask import Flask, jsonify
from flask.globals import request
import csv

app = Flask(__name__)

from products import products

@app.route('/ping')
def ping():
    return jsonify({"message": "pong"})

@app.route('/products')
def getProducts():
    return jsonify(products)

@app.route('/products/<string:product_name>')
def getProduct(product_name):
    productsFound = [product for  product in products if product['name'] == product_name]
    if len(productsFound) > 0 :
        return jsonify(productsFound)
    return jsonify({"message": "product not found"})
    
@app.route('/products', methods = ['POST'])
def addProduct():
    newProduct = {
        "name":request.json['name'],
        "price": request.json['price'],
        "quantity": request.json['quantity']
    }
    products.append(newProduct)
    return jsonify({"message": "Product Added Succesfully", "products": products})

@app.route('/products/<string:product_name>', methods=['PUT'])
def editProduct(product_name):
    productFound = [product for product in products if product['name'] == product_name]
    if len(productFound) > 0:
        productFound[0]['name'] = request.json['name']
        productFound[0]['price'] = request.json['price']
        productFound[0]['quantity'] = request.json['quantity']
        return jsonify({
            "message": "Product Updated",
            "product": productFound[0]
        })
    return jsonify({"message": "Product Not found"})

@app.route('/products/<string:product_name>', methods = ['DELETE'])
def deleteProduct(product_name):
    productsFound = [product for product in products if product['name'] == product_name]
    if len(productsFound) > 0:
        products.remove(productsFound[0])
        return jsonify({
            "message": "Product Deleted",
            "products": products
        })
    return jsonify({"message": "Product Not Found"})

@app.route('/dataset')
def ReadDataSet():
    with open('Cleaned-Data.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for line in csv_reader:
            print(line[0])
    return jsonify({"message": "Dataset Done"})

if __name__ == '__main__':
    app.run(debug=True, port=9000)