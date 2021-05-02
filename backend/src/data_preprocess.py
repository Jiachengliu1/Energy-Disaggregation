import pandas as pd
import os

class dataPreparation:
    def __init__(self, filename):
        self.cur_path = os.getcwd()
        self.filename = filename
        # delete sub path '/src'
        # self.relative_path = self.cur_path[:-4]
        self.file_path = self.cur_path + '/' + self.filename
        # print(self.file_path)
        self.df = pd.read_table(self.file_path, sep=',')
        self.preprocess()
        # print(self.df)


    def preprocess(self):
        def isWeekend(day):
            if day in {0, 1, 2, 3, 4}:
                return False
            return True

        df = self.df
        df.insert(1, 'Month', '')
        df.insert(2, 'Day', '')
        df.insert(3, 'Hour', '')
        df.insert(4, 'isWeekend', '')

        df['datetime'] = pd.to_datetime(df['datetime'])
        df['Month'] = df['datetime'].dt.month
        df['Day'] = df['datetime'].dt.day
        df['Hour'] = df['datetime'].dt.hour
        df['isWeekend'] = df['datetime'].dt.dayofweek.apply(isWeekend)

        self.df = df

