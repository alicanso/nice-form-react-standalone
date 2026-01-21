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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import NiceForm from '../NiceForm';
import { Field, FieldArray } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Select, CheckboxWithLabel, SimpleFileUpload, RadioGroup, Switch, Autocomplete, } from 'formik-mui';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
var normalizeOptions = function (options) {
    if (!Array.isArray(options)) {
        throw new Error('Options should be array in nice form meta.');
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
var formikAdapter = {
    defaultViewWidget: function (_a) {
        var value = _a.value, label = _a.label, field = _a.field, meta = _a.meta, rest = __rest(_a, ["value", "label", "field", "meta"]);
        return (_jsxs("div", __assign({}, rest, { children: [_jsx(InputLabel, __assign({ shrink: true }, { children: label })), _jsx("div", { children: value || 'N/A' })] })));
    },
    widgetMap: {
        text: {
            widget: TextField,
            metaConverter: function (_a) {
                var field = _a.field;
                // It's fine to modify field directly since widgetProps is already a copy
                if (!field.widgetProps.hasOwnProperty('fullWidth')) {
                    field.widgetProps.fullWidth = true;
                }
                return field;
            },
        },
        upload: {
            widget: SimpleFileUpload,
        },
        checkbox: {
            widget: CheckboxWithLabel,
            metaConverter: function (_a) {
                var _b, _c;
                var field = _a.field;
                var newField = __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { fullWidth: (_b = field.widgetProps) === null || _b === void 0 ? void 0 : _b.fullWidth, type: 'checkbox', Label: {
                            label: (_c = field.widgetProps) === null || _c === void 0 ? void 0 : _c.label,
                        } }) });
                delete newField.widgetProps.fullWidth;
                return newField;
            },
        },
        'radio-group': {
            widget: RadioGroup,
            metaConverter: function (_a) {
                var field = _a.field, meta = _a.meta;
                var labelId = "".concat(meta.name || 'form', "-").concat(field.key, "-label");
                return __assign(__assign({}, field), { render: field.render ||
                        (function () {
                            var _a;
                            return (_jsxs(FormControl, { children: [_jsx(FormLabel, __assign({ id: labelId }, { children: (_a = field.widgetProps) === null || _a === void 0 ? void 0 : _a.label })), _jsx(Field, __assign({ component: RadioGroup, "aria-labelledby": labelId, name: field.name, row: true }, field.widgetProps, { children: (field.options || []).map(function (opt) {
                                            var _a;
                                            return (_jsx(FormControlLabel, { value: opt.value, control: _jsx(Radio, __assign({ disabled: (_a = field.widgetProps) === null || _a === void 0 ? void 0 : _a.disabled }, opt.radioProps)), label: opt.label }, opt.value));
                                        }) }))] }));
                        }) });
            },
        },
        switch: {
            widget: function (_a) {
                var label = _a.label, required = _a.required, disabled = _a.disabled, form = _a.form, field = _a.field, meta = _a.meta, formControl = _a.formControl, formControlLabel = _a.formControlLabel, rest = __rest(_a, ["label", "required", "disabled", "form", "field", "meta", "formControl", "formControlLabel"]);
                return (_jsx(FormControl, __assign({}, formControl, { children: _jsx(FormControlLabel, __assign({ control: _jsx(Switch, __assign({ type: "checkbox", field: field, meta: meta, form: form }, rest)), label: label, required: required, disabled: form.isSubmitting }, formControlLabel)) })));
            },
        },
        autocomplete: {
            widget: Autocomplete,
        },
        select: {
            widget: Select,
            metaConverter: function (_a) {
                var field = _a.field, meta = _a.meta;
                var labelId = "".concat(meta.name || 'form', "-").concat(field.key, "-label");
                var newField = __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { labelId: labelId, inputLabel: __assign({ required: field.widgetProps.required }, (field.inputLabel || {})), formControl: __assign({ fullWidth: field.widgetProps.fullWidth }, (field.formControl || {})), children: normalizeOptions(field.options || []).map(function (opt) { return (_jsx(MenuItem, __assign({ value: opt.value }, opt.props, { children: opt.label }), opt.value)); }) }) });
                return newField;
            },
        },
        'form-list': {
            widget: FieldArray,
            metaConverter: function (_a) {
                var field = _a.field;
                return __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { name: field.name, children: function (arrayHelpers) {
                            var fields = arrayHelpers.form.values["".concat(field.name)] || [];
                            var meta = {
                                rowGap: 10,
                                fields: fields.map(function (_, index) {
                                    var _a;
                                    return __assign(__assign({ key: "".concat(field.name, ".").concat(index), label: (_a = field.widgetProps) === null || _a === void 0 ? void 0 : _a.label, extraNode: (_jsx(_Fragment, { children: fields.length > 1 ? (_jsx("span", __assign({ style: {
                                                    position: 'absolute',
                                                    right: '-24px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    color: 'red',
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '50%',
                                                    border: '1px solid red',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    lineHeight: '16px',
                                                }, className: "dynamic-delete-button", onClick: function () { return arrayHelpers.remove(index); } }, { children: "-" }))) : null })) }, (field.listItemProps || {})), (typeof field.getListItemProps === 'function'
                                        ? field.getListItemProps(fields, arrayHelpers)
                                        : null));
                                }),
                            };
                            return (_jsxs(_Fragment, { children: [field.hasOwnProperty('listTop') ? field.listTop : null, _jsx(NiceForm, { meta: meta }), field.hasOwnProperty('listBottom') ? (field.listBottom) : (_jsx(Button, __assign({ onClick: function () { return arrayHelpers.push(''); } }, (field.addItemButtonProps || {}), { children: field.addItemButtonLabel || '+ Add Item' })))] }));
                        } }) });
            },
        },
    },
    // Common meta converter
    metaConverter: function (meta) {
        return __assign(__assign({}, meta), { fields: meta.fields.map(function (f) {
                var newF = __assign({}, (f || {}));
                var widgetProps = __assign({}, f.widgetProps);
                // These keys should be only on widgetProps
                ['required', 'fullWidth', 'label', 'help'].forEach(function (p) {
                    if (newF.hasOwnProperty(p))
                        widgetProps[p] = newF[p];
                    delete newF[p];
                });
                return __assign(__assign({}, newF), { widgetProps: widgetProps });
            }) });
    },
};
// Alias for text since the default widget is 'input'. Keep consistence.
formikAdapter.widgetMap.input = formikAdapter.widgetMap.text;
export default formikAdapter;
//# sourceMappingURL=formikMuiAdapter.js.map