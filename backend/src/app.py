import flask, json
from flask import request, Response
from flask_cors import CORS
from collections import defaultdict
from werkzeug.utils import secure_filename
from ml_kit import ML
import os

UPLOAD_FOLDER = './upload'

server = flask.Flask(__name__)
server.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(server, origins='*')

ml = None
file_path = ''

@server.route('/test', methods=['get', 'post'])
def test():
    # resp = flask.Response("Foo bar baz")
    # resp.headers['Access-Control-Allow-Origin'] = '*'
    # return resp
    data = json.dumps({'status': '0', 'msg': 'welcome! lance'})
    # test.headers['Access-Control-Allow-Origin'] = '*'
    # resp = make_response(data)
    # resp.status = '200'
    return data, 200
    # return Response(data, status=0, mimetype='application/json')


@server.route('/model_training', methods=['get', 'post'])
def model_training():
    Category = request.values.get('Category')
    source_data = {}

    if Category == 'Linear Regression':
        source_data['Linear Regression'] = defaultdict(dict)
        source_data['Linear Regression']['Result']['Head'] = ['', 'Refrigerator', 'Dishwasher']
        source_data['Linear Regression']['Result']['Body'] = [['Linear Regression RMSE', '84.20', '123.01']]


    if Category == 'Random Forest':
        source_data['Random Forest'] = defaultdict(dict)
        source_data['Random Forest']['Classification']['Head'] = ['', 'Refrigerator', 'Dishwasher']
        source_data['Random Forest']['Classification']['Body'] = [['Logistic Regression Accuracy', '0.74', '0.91'],
                                                                  ['Random Forest Classifier Accuracy', '0.98', '0.93']]
        source_data['Random Forest']['Regression']['Head'] = ['', 'Refrigerator', 'Dishwasher']
        source_data['Random Forest']['Regression']['Body'] = [['Linear Regression RMSE', '84.20', '123.01'],
                                                              ['Random Forest Regression RMSE', '44.57', '78.00']]

    if Category == 'KNN':
        source_data['KNN'] = defaultdict(dict)
        source_data['KNN']['Classification']['Head'] = ['', 'Refrigerator', 'Dishwasher']
        source_data['KNN']['Classification']['Body'] = [['Logistic Regression Accuracy', '0.74', '0.91'],
                                                        ['KNN Classifier Accuracy', '0.98', '0.97']]
        source_data['KNN']['Regression']['Head'] = ['', 'Refrigerator', 'Dishwasher']
        source_data['KNN']['Regression']['Body'] = [['Linear Regression RMSE', '84.20', '123.01'],
                                                              ['KNN Regression RMSE', '35.31', '60.86']]


    if Category == 'Model Comparsion':
        source_data['Model Comparsion'] = defaultdict(dict)
        source_data['Model Comparsion']['RMSE']['Head'] = [' ', 'Linear Regression', 'Random Forest',
                                         'K-Nearest Neighbors(KNN)', 'Long Short Term Memory(LSTM)',
                                         'Convolutional Neural Networks(CNN)']
        source_data['Model Comparsion']['RMSE']['Body'] = [['Refrigerator', '84.20', '46.85', '36.37', '46.85', '61.35'],
                                         ['Dishwasher', '121.01', '65.11', '50.55', '93.64', '85.44']]
        source_data['Model Comparsion']['MAE']['Head'] = [' ', 'Linear Regression', 'Random Forest',
                                                           'K-Nearest Neighbors(KNN)', 'Long Short Term Memory(LSTM)',
                                                           'Convolutional Neural Networks(CNN)']
        source_data['Model Comparsion']['MAE']['Body'] = [['Refrigerator', '8.05', '3.66', '2.90', '4.30', '4.83'],
                                                          ['Dishwasher', '7.41', '3.20', '2.48', '4.71', '4.51']]

    if Category == 'CNN':
        source_data['CNN'] = defaultdict(dict)
        source_data['CNN']['Architecture']['flowChart'] = ['Convolutional Layer(128 filters)', 'Pooling Layer',
                                                           'Convolutional Layer(64 filters)', 'Pooling Layer',
                                                           'Convolutional Layer(32 filters)', 'Pooling Layer',
                                                           'Flatten Layer', 'Dense Layer(50 units)',
                                                           'Dense Layer(1 unit)']
        source_data['CNN']['Result']['Head'] = [' ', 'Refrigerator', 'Dishwasher']
        source_data['CNN']['Result']['Body'] = [['Batch size', '20', '64'], ['Epoch', '25', '25'],
                                                ['Estimated Training Time', '5 min', '< 2min'],
                                                ['RMSE', '61.35', '85.44']]

    if Category == 'LSTM':
        source_data['LSTM'] = defaultdict(dict)
        source_data['LSTM']['Result']['Head'] = ['Our LSTM Model Result(CuDNN package Acceleration)',
                                                 'Reference Paper Result (Chooruang, 2020)']
        source_data['LSTM']['Result']['Body'] = [['House Number: 1', 'House Number: 1'],
                                                 ['Batch Size: 32', 'Batch Size: 512'],
                                                 ['Epoch: 10', 'Epoch: 100'],
                                                 ['Time Elasped: 240 seconds', 'Time Elasped: 5 hours'],
                                                 ['RMSE on Refrigerator: 46.85', 'RMSE on Refrigerator: 69.11']]


    data = json.dumps({'status': '0', 'data': source_data})

    return data

@server.route('/remove_file', methods=['get', 'post'])
def remove_file():
    global file_path
    if not file_path:
        return json.dumps({'status': '0', 'msg': 'no file uploaded!'})
    os.remove(file_path)
    file_path = ''

    return json.dumps({'status': '0', 'msg': 'delete file success!'})

@server.route('/model_prediction_upload', methods=['get', 'post'])
def model_prediction_upload():
    uploaded_file = request.files['file']
    uploaded_file.save(uploaded_file.filename)
    # uploaded_file.save(secure_filename(uploaded_file.filename))
    filename = uploaded_file.filename
    global ml, file_path
    ml = ML(filename)
    file_path = ml.file_path
    data = json.dumps({'status': '0', 'msg': 'upload success!'})
    return data


@server.route('/model_prediction', methods=['get', 'post'])
def mode_prediction():
    method = request.values.get('Category')
    res = ml.predict(method)
    data = json.dumps({'status': '0', 'msg': 'predict success!', 'res': res})
    return data



if __name__ == '__main__':
    server.run(debug=True, port=8888, host='0.0.0.0')



