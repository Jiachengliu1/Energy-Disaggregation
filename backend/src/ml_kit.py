from data_preprocess import dataPreparation
import joblib
import tensorflow as tf
import os
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import pandas as pd

interval = -1
data_len = -1

class ML():
    def __init__(self, filename):
        self.filename = filename
        self.tag = 1
        _preprocess = dataPreparation(self.filename)
        self.file_path = _preprocess.file_path
        self.data = _preprocess.df
        self.drop_datetime_data = self.data[['Month', 'Day', 'Hour', 'isWeekend', '1 mains', '2 mains']]
        self.model_path = os.getcwd() + '/model/models'
        self.lstmr_dish_path = self.model_path + '/lstmr_dish'
        self.lstmr_ref_path = self.model_path + '/lstmr_ref'
        self.cnnr_dish_path = self.model_path + '/cnnr_dish'
        self.cnnr_ref_path = self.model_path + '/cnnr_ref'
        self.knnr_dish_path = self.model_path + '/KNNR_dish.pkl'
        self.knnr_ref_path = self.model_path + '/KNNR_ref.pkl'
        self.rfr_dish_path = self.model_path + '/RFR_dish.pkl'
        self.rfr_ref_path = self.model_path + '/RFR_ref.pkl'
        self.total_consumption = {}
        self.process_total_consumption()

    def process_total_consumption(self):
        data = self.data
        data1 = data[['1 mains', '2 mains']].sum(axis=1).to_frame().rename(columns={0: 'total consumption'})
        data2 = pd.concat([data['datetime'], data1], axis=1)
        global interval, data_len
        data_len = len(data2)
        # 30min
        # interval = int(length / 48)
        # 10 min
        # interval = int(length/144)
        # 5min
        interval = int(data_len / 288)
        idx = list(range(interval, data_len+1, interval))
        print(idx)
        # print(data2.iloc[np.r_[idx], :])

        # s = data2.iloc[0:1, ]['datetime']
        start_time = data2['datetime'][0]
        value = list(data2.iloc[np.r_[idx], :]['total consumption'])
        value = list(map(lambda x: round(x, 2), value))
        # print(value)
        dic = {'time': str(start_time), 'value': value}
        self.total_consumption = dic
        print(start_time)

        # fig, axs = plt.subplots(1, figsize=(7, 4))
        # plt.xticks(rotation=15)
        # fig.tight_layout(pad=5)
        # axs.plot(data['datetime'], data1['total consumption'])
        # axs.set_title('total consumption')
        # axs.set_xlabel('Timestamp')
        # axs.set_ylabel('Power Consumption')
        # fig.show()
        #
        # sio = BytesIO()
        # fig.savefig(sio, format='png', bbox_inches='tight', pad_inches=0.0)
        # data = base64.encodebytes(sio.getvalue()).decode()
        #
        # img = 'data:image/png;base64,' + str(data)
        # self.total_consumption = img

    def output_imgs(self, y_dish, y_ref, timestamp):
        fig_dish, axs_dish = plt.subplots(1, figsize=(7, 4))
        plt.xticks(rotation=15)
        fig_dish.tight_layout(pad=5)
        axs_dish.plot(timestamp, y_dish)
        axs_dish.set_title('Dishwasher')
        axs_dish.set_xlabel('Timestamp')
        axs_dish.set_ylabel('Power Consumption')
        fig_dish.show()

        fig_ref, axs_ref = plt.subplots(1, figsize=(7, 4))
        plt.xticks(rotation=15)
        fig_ref.tight_layout(pad=5)
        axs_ref.plot(timestamp, y_ref)
        axs_ref.set_title('Refrigerator')
        axs_ref.set_xlabel('Timestamp')
        axs_ref.set_ylabel('Power Consumption')
        fig_ref.show()

        sio_dish = BytesIO()
        fig_dish.savefig(sio_dish, format='png', bbox_inches='tight', pad_inches=0.0)

        sio_ref = BytesIO()
        fig_ref.savefig(sio_ref, format='png', bbox_inches='tight', pad_inches=0.0)

        data_dish = base64.encodebytes(sio_dish.getvalue()).decode()
        data_ref = base64.encodebytes(sio_ref.getvalue()).decode()

        img_srcs = {}

        img_dish = 'data:image/png;base64,' + str(data_dish)
        img_ref = 'data:image/png;base64,' + str(data_ref)

        img_srcs['dish'] = img_dish
        img_srcs['ref'] = img_ref
        img_srcs['total_consumption'] = self.total_consumption

        return img_srcs


    def output(self, y_dish, y_ref, timestamp):
        y_dish = y_dish.tolist()
        y_ref = y_ref.tolist()
        y_dish = y_dish[interval: data_len+1: interval]
        y_ref = y_ref[interval: data_len+1: interval]
        y_dish = list(map(lambda x: round(x, 2), y_dish))
        y_ref = list(map(lambda x: round(x, 2), y_ref))

        res = {}
        res['dish'] = y_dish
        res['ref'] = y_ref
        res['total_consumption'] = self.total_consumption
        return res


    def predict(self, method):
        if method == 'LSTM':
            X_test = np.asarray(self.drop_datetime_data).astype('float32').reshape(-1, 1, 6)
            lstm_dish = tf.keras.models.load_model(self.lstmr_dish_path)
            lstm_ref = tf.keras.models.load_model(self.lstmr_ref_path)
            y_dish = lstm_dish.predict(X_test)
            y_ref = lstm_ref.predict(X_test)
            y_dish = np.asarray(y_dish).astype('float32').reshape(-1)
            y_ref = np.asarray(y_ref).astype('float32').reshape(-1)

            res = self.output(y_dish, y_ref, self.data['datetime'])
            print("LSTM")
            return res


        if method == 'CNN':
            X_test = np.asarray(self.drop_datetime_data).astype('float32').reshape(-1, 1, 6)
            cnnr_dish = tf.keras.models.load_model(self.cnnr_dish_path)
            cnnr_ref = tf.keras.models.load_model(self.cnnr_ref_path)
            y_dish = cnnr_dish.predict(X_test)
            y_ref = cnnr_ref.predict(X_test)
            y_dish = np.asarray(y_dish).astype('float32').reshape(-1)
            y_ref = np.asarray(y_ref).astype('float32').reshape(-1)

            res = self.output(y_dish, y_ref, self.data['datetime'])
            print("CNN")
            return res

        if method == 'KNN':
            knn_dish = joblib.load(self.knnr_dish_path)
            knn_ref = joblib.load(self.knnr_ref_path)
            y_dish = knn_dish.predict(self.drop_datetime_data)
            y_ref = knn_ref.predict(self.drop_datetime_data)

            res = self.output(y_dish, y_ref, self.data['datetime'])
            print("KNN")
            return res


        if method == 'Random Forest':
            rfr_dish = joblib.load(self.rfr_dish_path)
            rfr_ref = joblib.load(self.rfr_ref_path)
            y_dish = rfr_dish.predict(self.drop_datetime_data)
            y_ref = rfr_ref.predict(self.drop_datetime_data)

            res = self.output(y_dish, y_ref, self.data['datetime'])
            print("Random Forest")
            return res












