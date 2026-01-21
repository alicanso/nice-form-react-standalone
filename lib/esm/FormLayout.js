var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/**
 * The layout component of NiceForm based on css grid. It's only used internally.
 * @param param0
 * @returns
 */
var FormLayout = function (_a) {
    var _b, _c;
    var elements = _a.elements, meta = _a.meta;
    var _d = meta.columns, columns = _d === void 0 ? 1 : _d;
    var style = {
        display: 'grid',
        gridTemplateColumns: "repeat(".concat(columns, ", 1fr)"),
        gridColumnGap: (_b = meta.columnGap) !== null && _b !== void 0 ? _b : 0,
        gridRowGap: (_c = meta.rowGap) !== null && _c !== void 0 ? _c : 0,
    };
    var currentColStart = 0;
    return (_jsx("div", __assign({ className: "nice-form-layout", style: style }, { children: elements.map(function (_a) {
            var element = _a.element, field = _a.field;
            var colSpan = field.colSpan || 1;
            if (field.clear && ['left', 'both'].includes(field.clear)) {
                currentColStart = 0;
            }
            currentColStart = currentColStart % columns;
            var fieldStyle = {
                gridColumn: "".concat(currentColStart + 1, " / span ").concat(colSpan),
                position: 'relative',
            };
            if (field.clear && ['both', 'right'].includes(field.clear)) {
                currentColStart = 0;
            }
            else {
                currentColStart += colSpan;
            }
            return (_jsxs("div", __assign({ style: fieldStyle }, { children: [element, field.extraNode || null] }), field.key));
        }) })));
};
export default FormLayout;
//# sourceMappingURL=FormLayout.js.map