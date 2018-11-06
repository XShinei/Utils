/**
 *  base
 */
function debounce(fn, delay) {
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

/**
 *  immediate
 */
function debounce(fn, delay, immediate) {
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;

        timer && clearTimeout(timer);

        if(immediate) {
            const doNow = !timer;

            timer = setTimeout(() => {
                timer = null;
            }, delay);

            doNow && fn.apply(context, args);
        }
        else {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }
    };
}

/**
 *  return
 */
function debounce(fn, delay, immediate) {
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;
        let result = undefined;

        timer && clearTimeout(timer);

        if (immediate) {
            const doNow = !timer;

            timer = setTimeout(() => {
                timer = null;
            }, delay);
            
            if (doNow) {
                result = fn.apply(context, args);
            } 
        }
        else {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }

        return result;
    };
}

/**
 *  return Promise
 */