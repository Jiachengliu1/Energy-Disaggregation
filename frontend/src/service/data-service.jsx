import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class dbData{
    getData_modelTraining(listParam){
        let url  = '',
            data = {};
        url = 'http://127.0.0.1:8888/model_training';
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : listParam
        });
    }


    getData_ModelPrediction(listParam){
        let url  = '',
            data = {};
        url = 'http://127.0.0.1:8888/model_prediction';
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : listParam
        });
    }

    delete_File(){
        let url  = '',
            data = {};
        url = 'http://127.0.0.1:8888/remove_file';
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data,
        });
    }


    getDataList(){
        let url  = '',
            data = {};
        url = 'http://127.0.0.1:8888/test';
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

}

export default dbData;