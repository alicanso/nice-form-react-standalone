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
import { jsx as _jsx } from "react/jsx-runtime";
import { Field, FastField } from 'formik';
import { niceFormFieldStdKeys, without } from '../utils';
// each formik widget will be passed with { field, meta } props
var formikAdapter = {
    metaConverter: function (meta) {
        return __assign(__assign({}, meta), { fields: meta.fields.map(function (f) {
                // Note: formik doesn't support mixed dot and nested object: {'a.b': {c: 1} } => ['a.b', 'c']
                return __assign(__assign({}, f), { name: Array.isArray(f.name)
                        ? f.key.startsWith('!!!')
                            ? "['".concat(f.name.join("', '"), "']")
                            : f.name.join('.')
                        : f.name });
            }) });
    },
    renderField: function (_a) {
        var field = _a.field, meta = _a.meta;
        var FormWidget = field.widget;
        var ViewWidget = field.viewWidget;
        var viewMode = meta.viewMode || field.viewMode;
        var wrapperProps = __assign(__assign(__assign({}, meta.wrapperProps), without(field, niceFormFieldStdKeys)), { name: field.name });
        var widgetProps = __assign({}, field.widgetProps);
        if (viewMode) {
            return field.renderView ? (field.renderView(field.initialValue, { field: field, meta: meta })) : (_jsx(ViewWidget, __assign({ field: field, meta: meta, value: field.initialValue }, widgetProps)));
        }
        // Allows onChange, onBlur events on widgetProps
        var widgetOnChange = widgetProps === null || widgetProps === void 0 ? void 0 : widgetProps.onChange;
        var widgetOnBlur = widgetProps === null || widgetProps === void 0 ? void 0 : widgetProps.onBlur;
        delete widgetProps.onChange;
        delete widgetProps.onBlur;
        var FieldComp = field.fast ? FastField : Field;
        return (_jsx(FieldComp, __assign({}, wrapperProps, { children: function (_a) {
                var field = _a.field, form = _a.form, meta = _a.meta;
                var newFormikField = __assign({}, field);
                // allow onChange, onBlur to be called by widgetProps
                if (widgetOnChange) {
                    newFormikField.onChange = function (e) {
                        field.onChange(e);
                        widgetOnChange(e);
                    };
                }
                if (widgetOnBlur) {
                    newFormikField.onBlur = function (e) {
                        field.onBlur(e);
                        widgetOnBlur(e);
                    };
                }
                return _jsx(FormWidget, __assign({}, widgetProps, { field: newFormikField, form: form, meta: meta }));
            } })));
    },
};
export default formikAdapter;
//# sourceMappingURL=formikAdapter.js.map