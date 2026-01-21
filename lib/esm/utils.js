/**
 * Delete properties from object, return new object.
 * @param obj
 * @param arr
 * @returns
 */
export var without = function (obj, arr) {
    var newObj = {};
    Object.keys(obj).forEach(function (p) {
        if (arr.includes(p))
            return;
        newObj[p] = obj[p];
    });
    return newObj;
};
/**
 * Check if a value is undefined.
 * @param value
 * @returns
 */
export var isUndefined = function (value) { return typeof value === 'undefined'; };
/**
 * Get value from object by path. The path could be an array or a string
 * separated by dot.
 * @param obj
 * @param prop
 * @returns
 */
export var get = function (obj, prop) {
    var arr = Array.isArray(prop) ? prop : prop.split('.');
    for (var i = 0; i < arr.length; i++) {
        if (typeof obj !== 'object' || obj === null)
            return undefined;
        if (!(arr[i] in obj))
            return undefined;
        obj = obj[arr[i]];
    }
    return obj;
};
/**
 * Set value to object by path. The path could be an array or a string separated by dot.
 * @param obj
 * @param prop
 * @returns
 */
export var has = function (obj, prop) {
    var arr;
    if (!Array.isArray(prop) && !prop.startsWith('!!!'))
        arr = prop.split('.');
    else if (typeof prop === 'string')
        arr = [prop];
    else
        arr = prop;
    return (arr.reduce(function (o, p) {
        return o && o.hasOwnProperty(p) ? o[p] : undefined;
    }, obj) !== undefined);
};
/**
 * Normalize options to { value, label } format. The options could be an array of
 * string, array or object.
 *
 * For example:
 * ['a', 'b'] => [{ value: 'a', label: 'a' }, { value: 'b', label: 'b' }]
 * [['a', 'A'], ['b', 'B']] => [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]
 * [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] => [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]
 * @param options
 * @returns
 */
export var normalizeOptions = function (options) {
    if (!Array.isArray(options)) {
        throw new Error('Options should be array in form builder meta.');
    }
    return options.map(function (opt) {
        if (Array.isArray(opt)) {
            return { value: opt[0], label: opt[1] };
        }
        else if (typeof opt === 'object') {
            return opt;
        }
        else {
            return { value: opt, label: opt };
        }
    });
};
/**
 * The standard keys for form field meta. These keys are handled by nice form itself.
 * Other fields are handled by adapters.
 */
export var niceFormFieldStdKeys = [
    'key',
    'name',
    'label',
    'help',
    'required',
    'disabled',
    'extraNode',
    'fullWidth',
    'initialValue',
    'options',
    'colSpan',
    'rowSpan',
    'viewMode',
    'children',
    'clear',
    'render',
    'renderView',
    'widget',
    'widgetProps',
    'viewWidget',
    'viewWidgetProps',
    'wrapperProps',
    'condition',
];
//# sourceMappingURL=utils.js.map