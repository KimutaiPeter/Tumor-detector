from flask import render_template,Flask,session,request,redirect,jsonify
import os
import cv2
import numpy as np
from PIL import Image
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
import pickle
from flask_cors import CORS, cross_origin

UPLOAD_FOLDER = '.\\uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
CORS(app, support_credentials=False)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

f= open('trained_model_sv.sav', 'rb')
sv=pickle.load(f)
dec = {0:'No Tumor', 1:'Positive Tumor'}


@app.route('/')
def home():
    return jsonify({"message" : "Hello from Server","status" : "successful"})

@app.route('/upload',methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file1' not in request.files:
            return 'there is no file1 in form!'
        file1 = request.files['file1']
        path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
        file1.save(path)

        #read image file string data
        filestr = request.files['file1'].read()
        #convert string data to numpy array
        file_bytes = np.fromstring(filestr, np.uint8)
        # convert numpy array to image
        img = cv2.imdecode(file_bytes, cv2.IMREAD_UNCHANGED)


        return path
    

@app.route('/upload1', methods=['POST'])
def upload1():
    data =request.files['file1']
    img = Image.open(request.files['file1'])
    img = np.array(img)
    img1 = cv2.resize(img, (200,200))  # Resize to match training data shape
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY) # Convert to grayscale if the model expects grayscale images
    img1 = img1.reshape(1,-1)/255
    p = sv.predict(img1)
    return jsonify( {"code":dec[p[0]]})

@app.route('/upload2', methods=['POST'])
def upload2():
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
        result.append({'name':file.filename,"code":str(p[0]),'desc':dec[p[0]]})
    return jsonify({"message" : "Hello from Server",'data':result,"status" : "successful"})


app.run(host='0.0.0.0', port=5000, debug=True)