# ResitIMC5204C
To run the web application do the following steps:

A. From ui folder :
  1. Open a terminal
  2. To install dependancies, run the command : yarn build
  3. Then run the following commands : 
      - npm install -g serve
      - npm run build
      - serve -s build -l 3000

B. From the service folder :
   1. Open a terminal
   2. Run the following commands:
      - virtualenv -p Python3 .
      - source bin/activate
      - pip install -r requirements.txt
      - FLASK_APP=app.py flask run
