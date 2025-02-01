from flask import Flask,jsonify,request
from mongoengine import Document ,connect,StringField
from PIL import Image
import joblib
from flask_cors import CORS, cross_origin
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app, support_credentials=False)


isExisting = os.path.exists('/home/audirebocha/mysite/logistic_regression_model.joblib')
print(isExisting)

f= open('/home/audirebocha/mysite/logistic_regression_model.joblib', 'rb')
sv=joblib.load(f)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/upload2', methods=['POST'])
def upload2():
    f= open('/home/audirebocha/mysite/logistic_regression_model.joblib', 'rb')
    sv=joblib.load(f)
    dec={0:'no_tumor',1: '(pituitary_tumor)', 2:'(glioma tumor)', 3:'(meningioma_tumor)'}
    #print('Form',request.form)
    #print('Data',request.files)
    files = request.files.getlist('files[]')
    #print(files)
    result=[]
    for file in files:
        #print(file.filename)
        img = Image.open(file)
        img = np.array(img)
        img1 = cv2.resize(img, (200,200))  # Resize to match training data shape
        img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY) # Convert to grayscale if the model expects grayscale images
        img1 = img1.reshape(1,-1)/255
        p = sv.predict(img1)
        result.append({'name':file.filename,"code":str(p[0]),'desc': dec[p[0]] })
    return jsonify({"message" : "Hello from Server",'data':result,"status" : "successful"})


app.run(host='0.0.0.0', port=5000, debug=True)
