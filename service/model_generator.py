import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
import joblib


train_file_path = './data/train.csv'
home_data = pd.read_csv(train_file_path).rename(columns={'1stFlrSF':'FstFlrSF','2ndFlrSF':'SndFlrSF'})
y = home_data.SalePrice

features = ['LotArea', 'YearBuilt', 'FstFlrSF', 'SndFlrSF', 'FullBath', 'BedroomAbvGr', 'TotRmsAbvGrd']

X = home_data[features]
X.head()

train_X, val_X, train_y, val_y = train_test_split(X, y, random_state=1)

rf_model = RandomForestRegressor(random_state=1)
rf_model.fit(train_X, train_y)
rf_val_predictions = rf_model.predict(val_X)
rf_val_mae = mean_absolute_error(rf_val_predictions, val_y)

print("Validation MAE for Random Forest Model: {:,.0f}".format(rf_val_mae))

rf_model_on_full_data = RandomForestRegressor(random_state=1)
rf_model_on_full_data = rf_model_on_full_data.fit(X,y)

joblib.dump(rf_model_on_full_data,'classifier.joblib')
