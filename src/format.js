/**
 *  千位分隔数字
 *  比如：1234567.89 -> 1,234,567.89
 */
export function thousandSeparate(num) {
    if (typeof num !== 'number' && typeof num !== 'string') {
        return '';
    }

    num = String(num);
    const reg = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!reg.test(num)) {
        return '';
    }

    let _integer = '';
    let _decimals = '';

    if (num.indexOf('.') !== -1) {
        _integer = format(num.split('.').shift());
        _decimals = format(num.split('.').pop());
    }
    else {
        _integer = format(num);
    }

    function format(num) {
        let result = '';

        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, -3);
        }

        return num + result;
    }

    if (_decimals) {
        return _integer + '.' + _decimals;
    }

    return _integer;
}