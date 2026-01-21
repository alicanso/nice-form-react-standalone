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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch, Button, } from 'antd';
import NiceForm from '../NiceForm';
import { without, niceFormFieldStdKeys } from '../utils';
var isNamePathEqual = function (n1, n2) {
    if (Array.isArray(n1) && Array.isArray(n2) && JSON.stringify(n1) === JSON.stringify(n2)) {
        return true;
    }
    return n1 === n2;
};
var antdAdapter = {
    widgetMap: {
        input: { widget: Input },
        text: { widget: Input },
        password: { widget: Input.Password },
        textarea: { widget: Input.TextArea },
        number: { widget: InputNumber },
        //@ts-ignore
        'date-picker': { widget: DatePicker },
        radio: { widget: Radio },
        'radio-group': {
            widget: Radio.Group,
            metaConverter: function (_a) {
                var _b, _c;
                var field = _a.field;
                var RadioComp = Radio;
                if (field.options && !((_b = field.widgetProps) === null || _b === void 0 ? void 0 : _b.children)) {
                    return __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { name: field.key, children: (_c = field.options) === null || _c === void 0 ? void 0 : _c.map(function (opt) { return (_jsx(RadioComp, __assign({ value: opt.value }, opt.props, { children: opt.label }), opt.value)); }) }) });
                }
                return field;
            },
        },
        checkbox: {
            widget: Checkbox,
            metaConverter: function (_a) {
                var field = _a.field;
                return __assign(__assign({}, field), { valuePropName: 'checked' });
            },
        },
        switch: {
            widget: Switch,
            metaConverter: function (_a) {
                var field = _a.field;
                return __assign(__assign({}, field), { valuePropName: 'checked' });
            },
        },
        'checkbox-group': {
            widget: Checkbox.Group,
            metaConverter: function (_a) {
                var _b;
                var field = _a.field;
                if (field.options && !field.children) {
                    return __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { children: (_b = field.options) === null || _b === void 0 ? void 0 : _b.map(function (opt) { return (_jsx(Checkbox, __assign({ value: opt.value }, opt.props, { children: opt.label }), opt.value)); }) }) });
                }
                return field;
            },
        },
        select: {
            widget: Select,
            metaConverter: function (_a) {
                var _b;
                var field = _a.field;
                if (field.options && !field.children) {
                    return __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { children: (_b = field.options) === null || _b === void 0 ? void 0 : _b.map(function (opt) { return (
                            //@ts-ignore
                            _jsx(Select.Option, __assign({ label: opt.label, value: opt.key || opt.value, disabled: opt.disabled }, opt.props, { children: opt.children || opt.label }), opt.key || opt.value)); }) }) });
                }
                return field;
            },
        },
        'form-list': {
            widget: Form.List,
            metaConverter: function (_a) {
                var field = _a.field;
                return __assign(__assign({}, field), { widgetProps: __assign(__assign({}, field.widgetProps), { name: field.name, children: function (fields, _a, _b) {
                            var _c;
                            var add = _a.add, remove = _a.remove, move = _a.move;
                            var errors = _b.errors;
                            // Check for multiple fields support
                            var listItemMeta = field.listItemMeta || {};
                            var multipleFields = listItemMeta.fields;
                            if (multipleFields && Array.isArray(multipleFields) && multipleFields.length > 0) {
                                // Multiple fields per list item
                                var allItemFields_1 = [];
                                fields.forEach(function (f, i) {
                                    multipleFields.forEach(function (itemField, fieldIndex) {
                                        var _a;
                                        allItemFields_1.push(__assign(__assign(__assign({}, itemField), { key: "".concat(f.key, "-").concat(itemField.key), name: [f.name, itemField.key], style: __assign({ marginBottom: '10px' }, (itemField.style || {})), widgetProps: __assign(__assign({}, (itemField.widgetProps || {})), { placeholder: itemField.placeholder || ((_a = itemField.widgetProps) === null || _a === void 0 ? void 0 : _a.placeholder) }) }), (fieldIndex === multipleFields.length - 1 ? {
                                            extraNode: fields.length > 1 ? (_jsx("span", __assign({ style: {
                                                    position: 'absolute',
                                                    right: '-24px',
                                                    top: '9px',
                                                    color: 'red',
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '50%',
                                                    border: '1px solid red',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    lineHeight: '12px',
                                                }, className: "dynamic-delete-button", onClick: function () { return remove(f.name); } }, { children: "-" }))) : null,
                                        } : {})));
                                    });
                                });
                                var getDefaultValue_1 = function () {
                                    var obj = {};
                                    multipleFields.forEach(function (f) { var _a; obj[f.key] = (_a = f.initialValue) !== null && _a !== void 0 ? _a : ''; });
                                    return obj;
                                };
                                return (_jsxs(_Fragment, { children: [field.hasOwnProperty('listTop') ? field.listTop : null, _jsx(NiceForm, { meta: {
                                                columns: listItemMeta.columns || multipleFields.length,
                                                columnGap: (_c = listItemMeta.columnGap) !== null && _c !== void 0 ? _c : 16,
                                                fields: allItemFields_1
                                            } }), field.hasOwnProperty('listBottom') ? field.listBottom : (_jsx(Button, __assign({ type: "link", onClick: function () { return add(getDefaultValue_1()); } }, (field.addItemButtonProps || {}), { children: field.addItemButtonLabel || '+ Add Item' })))] }));
                            }
                            // Original: Single field per list item
                            var meta = {
                                fields: fields.map(function (f, i) { return (__assign(__assign(__assign(__assign({}, f), { name: [f.name], style: {
                                        marginBottom: '10px',
                                    }, extraNode: (_jsx(_Fragment, { children: fields.length > 1 ? (_jsx("span", __assign({ style: {
                                                position: 'absolute',
                                                right: '-24px',
                                                top: '9px',
                                                color: 'red',
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                border: '1px solid red',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                lineHeight: '12px',
                                            }, className: "dynamic-delete-button", onClick: function () { return remove(f.name); } }, { children: "-" }))) : null })) }), (field.listItemMeta || {})), (field.getListItemMeta
                                    ? field.getListItemMeta(fields, { add: add, move: move, remove: remove }, { errors: errors }, i)
                                    : {}))); }),
                            };
                            return (_jsxs(_Fragment, { children: [field.hasOwnProperty('listTop') ? field.listTop : null, _jsx(NiceForm, { meta: meta }), field.hasOwnProperty('listBottom') ? (field.listBottom) : (_jsx(Button, __assign({ type: "link", onClick: function () { return add(); } }, (field.addItemButtonProps || {}), { children: field.addItemButtonLabel || '+ Add Item' })))] }));
                        } }) });
            },
        },
    },
    metaConverter: function (meta) {
        var newMeta = __assign(__assign({}, meta), { fields: meta.fields.map(function (field) {
                var _a, _b;
                // Besides stdFieldKeys, all other properties are passed to wrapperProps.
                var newField = __assign(__assign({}, field), { widgetProps: field.widgetProps || {} });
                var rules = field.rules || [];
                if (field.required && !rules.find(function (r) { return r.required; })) {
                    rules.unshift({ required: true });
                }
                newField.rules = rules;
                if ((_a = newField.widgetProps) === null || _a === void 0 ? void 0 : _a.fullWidth) {
                    if (!((_b = newField.widgetProps) === null || _b === void 0 ? void 0 : _b.style)) {
                        newField.widgetProps.style = {};
                    }
                    newField.widgetProps.style.width = '100%';
                }
                // Normalize label col
                if (!newField.labelCol && meta.layout !== 'vertical') {
                    var labelWidth = meta.labelWidth || 8;
                    var span = labelWidth / (field.colSpan || 1);
                    newField.labelCol = { span: span };
                }
                return newField;
            }) });
        return newMeta;
    },
    // This ensures you can always get form value before form is connected/renderred
    getFieldValue: function (fieldName, meta, form) {
        var isFormConnected = Object.keys(form.getFieldsValue(true)).length > 0;
        if (isFormConnected)
            return form.getFieldValue(fieldName);
        var field = meta.fields.find(function (f) { return f.key === fieldName || (f.name !== undefined && isNamePathEqual(f.name, fieldName)); });
        return field === null || field === void 0 ? void 0 : field.initialValue;
    },
    renderField: function (_a) {
        var meta = _a.meta, field = _a.field;
        if (field.shouldUpdate) {
            return (_jsx(Form.Item, __assign({ shouldUpdate: field.shouldUpdate, noStyle: true }, { children: function () {
                    return antdAdapter.renderField({
                        meta: meta,
                        field: __assign(__assign({}, field), { shouldUpdate: false }),
                    });
                } })));
        }
        if (field.dependencies) {
            return (_jsx(Form.Item, __assign({ dependencies: field.dependencies, noStyle: true }, { children: function () {
                    return antdAdapter.renderField({
                        meta: meta,
                        field: __assign(__assign({}, field), { dependencies: undefined }),
                    });
                } })));
        }
        var FormWidget = field.widget;
        var ViewWidget = field.viewWidget;
        var viewMode = meta.viewMode || field.viewMode;
        var widgetProps = __assign({}, field.widgetProps);
        // Handle full width
        if (field.fullWidth) {
            if (!(widgetProps === null || widgetProps === void 0 ? void 0 : widgetProps.style)) {
                widgetProps.style = {};
            }
            widgetProps.style.width = '100%';
        }
        var content = viewMode ? (field.renderView ? (field.renderView(field.initialValue, { field: field, meta: meta })) : (
        //@ts-ignore
        _jsx(ViewWidget, __assign({}, field.viewWidgetProps, { value: field.initialValue })))) : (
        //@ts-ignore
        _jsx(FormWidget, __assign({}, widgetProps)));
        var wrapperProps = __assign(__assign(__assign({}, meta.wrapperProps), without(field, __spreadArray(__spreadArray([], niceFormFieldStdKeys, true), [
            'getListItemMeta',
            'listItemMeta',
            'addItemButtonLabel',
            'addItemButtonProps',
        ], false))), { className: field.className || '', style: field.style || {}, 
            // NOTE: use valuePropName at view mode so that UI is updated if initialValues changed at view mode.
            valuePropName: field.valuePropName || (viewMode ? 'initialValue' : 'value') });
        // These std keys are passed to Form.Item directly
        ['initialValue', 'help', 'required', 'label', 'name'].forEach(function (k) {
            wrapperProps[k] = field[k];
        });
        if (meta.viewMode) {
            // For view mode, user usually override below styles in css
            wrapperProps.className += ' nice-form-react-item-view-mode';
            wrapperProps.style.marginBottom = 5;
            field.widgetProps.required = false;
            wrapperProps.labelAlign = 'left';
        }
        return _jsx(Form.Item, __assign({}, wrapperProps, { children: content }));
    },
};
// Alias for backward compatibility
antdAdapter.widgetMap['text'] = antdAdapter.widgetMap['input'];
antdAdapter.widgetMap['date-time'] = antdAdapter.widgetMap['date-picker'];
export default antdAdapter;
//# sourceMappingURL=antdAdapter.js.map