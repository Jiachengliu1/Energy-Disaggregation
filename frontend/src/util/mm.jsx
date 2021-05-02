class MUtil{
	request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : res => {
                    typeof resolve === 'function' && resolve(res);
                    // 数据请求成功
                    // if(0 === res.status){
                        // typeof resolve === 'function' && resolve(res.data, res.msg);
                    // }
                    // 没有登录状态，强制登录
                    // else if(10 === res.status){
                        // this.doLogin();
                    // }
                    // else{
                        // typeof reject === 'function' && reject(res.msg || res.data);
                    // }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });  
    }
    // 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
}

export default MUtil;