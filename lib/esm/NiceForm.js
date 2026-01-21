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
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import FormField from './FormField';
import FormLayout from './FormLayout';
import config from './config';
import { get, has, normalizeOptions } from './utils';
/**
 * @description The component accepts meta parameter and renders the whole form.
 * @component
 */
var NiceForm = function (_a) {
    var meta = _a.meta;
    // Normalize fields
    var normalizedMeta = __assign(__assign({}, meta), { fields: meta.fields.map(function (field) {
            var convertedField = __assign({}, field);
            var widgetProps = __assign({}, field.widgetProps);
            // if children is only on field, then it means it's children of widgetProps
            ['children'].forEach(function (p) {
                if (convertedField.hasOwnProperty(p) && !widgetProps.hasOwnProperty(p)) {
                    widgetProps[p] = convertedField[p];
                    delete convertedField[p];
                }
            });
            // disabled property are on both widgetProps and field
            widgetProps.disabled = typeof field.disabled === 'boolean' ? field.disabled : meta.disabled;
            delete convertedField.disabled;
            convertedField.widgetProps = widgetProps;
            // Normalize options
            if (convertedField.options) {
                convertedField.options = normalizeOptions(convertedField.options);
            }
            // Normalize name property
            var k = String(convertedField.key);
            if (!convertedField.name) {
                // k maybe a number
                convertedField.name = k.startsWith('!!!') ? [k.replace('!!!', '')] : k.split('.');
            }
            // Normalize initialValue
            var initialValue = get(meta.initialValues || {}, field.name ? (Array.isArray(field.name) ? field.name : [field.name]) : field.key);
            // initialValue on a filed has lower priority
            if (typeof initialValue === 'undefined') {
                initialValue = convertedField.initialValue;
            }
            convertedField.initialValue = initialValue;
            var def = config.getWidgetDef(field.widget || config.defaultWidget);
            convertedField.widget = def.widget;
            // @ts-ignore
            if (def.metaConverter)
                convertedField.__niceFormFieldMetaConverter = def.metaConverter;
            var viewDef = config.getWidgetDef(convertedField.viewWidget || config.defaultViewWidget);
            convertedField.viewWidget = viewDef.widget;
            // @ts-ignore
            if (viewDef.metaConverter)
                convertedField.__niceFormFieldViewMetaConverter = viewDef.metaConverter;
            return convertedField;
        }) });
    config.metaConverters.forEach(function (convertor) {
        normalizedMeta = convertor(normalizedMeta);
    });
    // We should call widget metaConverters after form metaConverters
    // so that the whole meta is normalized first
    normalizedMeta.fields = normalizedMeta.fields.map(function (field) {
        var newField = field;
        // @ts-ignore
        if (field.__niceFormFieldMetaConverter) {
            // @ts-ignore
            newField = field.__niceFormFieldMetaConverter({ meta: normalizedMeta, field: field });
            // @ts-ignore
            delete newField.__niceFormFieldMetaConverter;
        }
        // @ts-ignore
        if (field.__niceFormFieldViewMetaConverter) {
            // @ts-ignore
            newField = field.__niceFormFieldViewMetaConverter({ meta: normalizedMeta, field: field });
            // @ts-ignore
            delete newField.__niceFormFieldViewMetaConverter;
        }
        return newField;
    });
    var elements = normalizedMeta.fields
        .map(function (field) {
        return {
            //@ts-ignore
            element: _jsx(FormField, { meta: normalizedMeta, field: field }, field.key),
            field: field,
        };
    })
        .filter(Boolean);
    return _jsx(FormLayout, { elements: elements, meta: normalizedMeta });
};
NiceForm.useUpdateOnChange = function (fields) {
    var _a = useState(true), value = _a[0], setValue = _a[1];
    if (typeof fields === 'string')
        fields = [fields];
    return useCallback(function (changedValues) {
        if (fields[0] === '*' ||
            (Array.isArray(fields) &&
                fields.some(function (f) {
                    return has(changedValues, f);
                }))) {
            setValue(!value);
        }
    }, [value]);
};
NiceForm.addAdapter = function (adapter) {
    config.addAdapter(adapter);
};
NiceForm.defineWidget = function (name, widget, metaConverter) {
    config.defineWidget(name, widget, metaConverter);
};
NiceForm.getFieldValue = function (fieldName, meta) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var a = config.adapters.reverse().find(function (a) { return !!a.getFieldValue; });
    if (a)
        return a.getFieldValue.apply(a, __spreadArray([fieldName, meta], args, false));
};
export default NiceForm;
//# sourceMappingURL=NiceForm.js.map