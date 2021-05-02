import warnings
from nilmtk import DataSet
import pandas as pd
from six import iteritems
import numpy as np
from sklearn import metrics
from sklearn.metrics import mean_absolute_error

from nilmtk.legacy.disaggregate import CombinatorialOptimisation, FHMM


def predict(clf, test_electricity, sample_period, timezone):
    predict = {}
    gt = {}

    for i, chunk in enumerate(test_electricity.mains().load(sample_period=sample_period)):
        chunk_drop_na = chunk.dropna()
        predict[i] = clf.disaggregate_chunk(chunk_drop_na)
        gt[i] = {}

        for meter in test_electricity.submeters().meters:
            gt[i][meter] = next(meter.load(sample_period=sample_period))
        gt[i] = pd.DataFrame({k: v.squeeze() for k, v in iteritems(gt[i])},
                             index=next(iter(gt[i].values())).index).dropna()

    gt_overall = pd.concat(gt)
    gt_overall.index = gt_overall.index.droplevel()
    pred_overall = pd.concat(predict)
    pred_overall.index = pred_overall.index.droplevel()

    gt_overall = gt_overall[pred_overall.columns]

    gt_index_utc = gt_overall.index.tz_convert("UTC")
    pred_index_utc = pred_overall.index.tz_convert("UTC")
    common_index_utc = gt_index_utc.intersection(pred_index_utc)

    common_index_local = common_index_utc.tz_convert(timezone)
    gt_overall = gt_overall.ix[common_index_local]
    pred_overall = pred_overall.ix[common_index_local]
    appliance_labels = [m.label() for m in gt_overall.columns.values]
    gt_overall.columns = appliance_labels
    pred_overall.columns = appliance_labels

    return gt_overall, pred_overall


def compute_rmse(gt, pred):
    rms_error = {}
    for appliance in gt.columns:
        rms_error[appliance] = np.sqrt(metrics.mean_squared_error(gt[appliance], pred[appliance]))
    return pd.Series(rms_error)

def compute_mae(gt, pred):
    rms_error = {}
    for appliance in gt.columns:
        rms_error[appliance] = np.sqrt(metrics.mean_absolute_error(gt[appliance], pred[appliance]))
    return pd.Series(rms_error)

def compute_r_2(gt, pred):
    r_2 = {}
    for appliance in gt.columns:
        r_2[appliance] = metrics.r2_score(gt[appliance], pred[appliance])
    return pd.Series(r_2)


if __name__ == '__main__':
    warnings.filterwarnings('ignore')

    train = DataSet('/Users/lansi/Desktop/USCstudy/560/project/data/low_freq/redd_low.h5')
    test = DataSet('/Users/lansi/Desktop/USCstudy/560/project/data/low_freq/redd_low.h5')

    house_num = 1
    train.set_window(end='30-4-2011')
    test.set_window(start='1-5-2011')

    train_electricity = train.buildings[house_num].elec
    test_electricity = test.buildings[house_num].elec

    top_5_train = train_electricity.submeters().select_top_k(k=5)

    clfs = {'CO': CombinatorialOptimisation(), 'FHMM': FHMM()}
    predictions = {}

    sample_period = 120

    for clf_name, clf in clfs.items():
        print('-' * 30)
        print(clf_name)
        print('-' * 30)
        clf.train(top_5_train, sample_period=sample_period)
        gt, predictions[clf_name] = predict(clf, test_electricity, 120, train.metadata['timezone'])

    print('-----------rmse---------')
    rmse = {}
    for clf_name in clfs.keys():
        rmse[clf_name] = compute_rmse(gt, predictions[clf_name])
    rmse = pd.DataFrame(rmse)
    print(rmse)

    print('-----------mae-----------')
    r_2 = {}
    for clf_name in clfs.keys():
        r_2[clf_name] = compute_mae(gt, predictions[clf_name])
    r_2 = pd.DataFrame(r_2)
    print(r_2)

    print('-----------r_2-----------')
    r_2 = {}
    for clf_name in clfs.keys():
        r_2[clf_name] = compute_r_2(gt, predictions[clf_name])
    r_2 = pd.DataFrame(r_2)
    print(r_2)


