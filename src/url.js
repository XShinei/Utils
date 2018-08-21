/**
 * 解析url中的querystring，以对象形式返回
 * @param {String} url 
 * @returns {Object} query
 */
function parseQuery(url) {
    const reg = /\?([\w\%\-\$]+=[\w\%\-\$]+&)*([\w\%\-\$]+=[\w\%\-\$]+)/;

    if (!reg.test(url)) {
        return {};
    }

    const query = {};
    const queryArr = url.match(/[\w\%\-\$]+=[\w\%\-\$]+/g);

    for (let item of queryArr) {
        const arr = item.split('=');
        const key = arr[0];
        const val = decodeURIComponent(arr[1]);
        
        query[key] = decodeURIComponent(val);
    }

    return query;
}