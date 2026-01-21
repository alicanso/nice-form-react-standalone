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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import config from './config';
/**
 * FormField only manages the layout of the field, and delegates the rendering of the field to the adapter.
 *
 * @param param0
 * @returns
 */
var FormField = function (_a) {
    var meta = _a.meta, field = _a.field;
    if (field.condition &&
        typeof field.condition === 'function' &&
        !field.condition({ meta: meta, field: field })) {
        return null;
    }
    if (field.render) {
        return field.render({ field: field, meta: meta });
    }
    var viewMode = meta.viewMode || field.viewMode;
    var FormWidget = field.widget;
    var ViewWidget = field.viewWidget;
    var widgetProps = __assign({}, field.widgetProps);
    var renderField = config.renderField, renderFieldWithoutLabel = config.renderFieldWithoutLabel;
    var content = renderField ? (renderField({
        meta: meta,
        field: field,
    })) : renderFieldWithoutLabel ? (renderFieldWithoutLabel({ meta: meta, field: field })) : viewMode ? (field.renderView ? (field.renderView(field.initialValue, { field: field, meta: meta })) : (
    //@ts-ignore
    _jsx(ViewWidget, __assign({}, field.viewWidgetProps, { value: field.initialValue })))) : (
    //@ts-ignore
    _jsx(FormWidget, __assign({}, widgetProps, { children: field.children || null })));
    if (renderField)
        return content;
    // If some field has label, then we need to set the label width
    var hasLabel = meta.fields.some(function (f) { return f.label; });
    var _b = meta.layout, layout = _b === void 0 ? 'horizontal' : _b;
    var isVertical = layout === 'vertical';
    var labelWidth = '';
    if (!isVertical && hasLabel) {
        labelWidth = String(field.labelWidth || meta.labelWidth || '33%');
        if (labelWidth.endsWith('%')) {
            labelWidth = parseFloat(labelWidth) / (field.colSpan || 1) + '%';
        }
    }
    var style = {
        display: 'grid',
        gridTemplateColumns: !isVertical && hasLabel ? "".concat(labelWidth, " 1fr") : '1fr',
        alignContent: 'center',
    };
    var label = null;
    if (hasLabel) {
        var labelStyle = {
            textAlign: viewMode || isVertical ? 'left' : 'right',
            marginRight: '8px',
        };
        if (field.required) {
            Object.assign(labelStyle, {
                '::before': {
                    content: '"*"',
                    color: 'red',
                },
            });
        }
        label = (_jsx("label", __assign({ style: labelStyle, className: "nice-form-field-label" }, { children: field.label })));
    }
    var help = null;
    // if renderFieldWithoutLabel method exists, it means the adapter has already handled the extra content
    if (!renderFieldWithoutLabel && field.help) {
        var helpStyle = {
            transform: 'scale(0.7)',
            transformOrigin: 'left',
            opacity: 0.6,
        };
        help = [
            _jsx("span", __assign({ style: helpStyle, className: "nice-form-field-help" }, { children: field.help }), "help-content"),
        ];
        if (hasLabel && !isVertical) {
            // an empty cell for just layout purpose
            help.unshift(_jsx("span", {}, "empty-cell"));
        }
    }
    return (_jsxs("span", __assign({ style: style, className: "nice-form-field" }, { children: [label, _jsx("span", { children: content }), help] })));
};
export default FormField;
//# sourceMappingURL=FormField.js.map