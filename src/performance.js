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
function debounce(fn, delay, immediate) {
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;

        return new Promise((resolve, reject) => {
            timer && clearTimeout(timer);

            if (immediate) {
                const doNow = !timer;

                timer = setTimeout(() => {
                    timer = null;
                }, delay);

                doNow && resolve(fn.apply(context, args));
            }
            else {
                timer = setTimeout(() => {
                    resolve(fn.apply(context, args));
                }, delay);
            }
        });
    };
}

/**
 *  base timestamp
 */
function throttle(fn, delay) {
    let last = 0;

    return function() {
        const context = this;
        const args = arguments;

        const now = +new Date();
        const offset = now - last;

        if (offset > delay) {
            last = now;
            fn.apply(context, args);
        }
    };
}

/**
 *  return value
 */
function throttle(fn, delay) {
    let last = 0;

    return function() {
        const context = this;
        const args = arguments;

        const now = +new Date();
        const offset = now - last;

        if (offset > delay) {
            last = now;
            return fn.apply(context, args);
        }
    };
}

/**
 *  base setTimeout
 */
function throttle(fn, delay) {
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}

/**
 *  mixin timestamp setTimeout
 */
function throttle(fn, delay) {
    let last = 0;
    let timer = null;

    return function() {
        const context = this;
        const args = arguments;

        const now = +new Date();
        const offset = now - last;

        if (offset > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            last = now;
            fn.apply(context, args);
        }
        else if (!timer) {
            timer = setTimeout(() => {
                last = +new Date();
                timer = null;
                fn.apply(context, args);
            }, delay - offset);
        }
    };
}

function throttle(fn, delay, options = {}) {
    let timer = null;
    let last = 0;

    return function() {
        const context = this;
        const args = arguments;

        const now = +new Date();
        
        if (last === 0 && options.immediate === false) {
            last = now;
        }

        const offset = now - last;

        if (offset > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            last = now;
            fn.apply(context, args);
        }
        else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                now = +new Date();
                timer = null;
                fn.apply(context, args);
            }, delay - offset);
        }
    };
}