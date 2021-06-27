from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
import joblib
import numpy as np
import mysql.connector

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Iowa Housing Prices Estimator", 
		  description = "Predict the price of a house in Iowa")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'LotArea': fields.Integer(required = True, 
				  							   description="Lot Area", 
    					  				 	   help="Lot Area cannot be blank"),
				  'YearBuilt': fields.Integer(required = True, 
				  							   description="Year Built", 
    					  				 	   help="Year Built cannot be blank"),
				  'FstFlrSF': fields.Integer(required = True, 
				  							description="First Floor square feet", 
    					  				 	help="First Floor square feet cannot be blank"),
				  'SndFlrSF': fields.Integer(required = True, 
				  							description="Second Floor square feet", 
    					  				 	help="Second Floor square feet cannot be blank"),
				  'FullBath': fields.Integer(required = True, 
				  							description="Full Bathroom", 
    					  				 	help="Full Bathroom cannot be blank"),
				  'BedroomAbvGr': fields.Integer(required = True, 
				  							description="Number of Bedrooms above ground", 
    					  				 	help="Number of Bedrooms above ground cannot be blank"),
				  'TotRmsAbvGrd': fields.Integer(required = True, 
				  							description="Total number of Rooms above ground", 
    					  				 	help="Total number of Rooms above ground cannot be blank")})

classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The estimated price is: " + str(round(prediction[0],2)) + "$"
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})