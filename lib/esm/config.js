var DefaultViewWidget = function (_a) {
    var value = _a.value;
    if (value === null || value === undefined)
        return 'N/A';
    return String(value);
};
var isHtmlTag = {};
var config = {
    defaultWidget: 'input',
    defaultViewWidget: DefaultViewWidget,
    widgetMap: {},
    metaConverters: [],
    adapters: [],
    addAdapter: function (adapter) {
        config.adapters.push(adapter);
        Object.assign(config.widgetMap, adapter.widgetMap);
        if (adapter.metaConverter)
            config.metaConverters.push(adapter.metaConverter);
        if (adapter.renderField)
            config.renderField = adapter.renderField;
        if (adapter.renderFieldWithoutLabel) {
            config.renderFieldWithoutLabel = adapter.renderFieldWithoutLabel;
        }
        if (adapter.defaultWidget) {
            console.log('set default widget');
            config.defaultWidget = adapter.defaultWidget;
        }
        if (adapter.defaultViewWidget) {
            config.defaultViewWidget = adapter.defaultViewWidget;
        }
    },
    defineWidget: function (name, widget, metaConverter) {
        this.widgetMap[name] = {
            widget: widget,
            metaConverter: metaConverter,
        };
    },
    /**
     *
     * @param widget
     * @returns Get widget definition from widget name or widget definition
     */
    getWidgetDef: function (widget) {
        var _a;
        if (!widget)
            return { widget: 'input' };
        if (typeof widget === 'string') {
            // if widget is a string, find it from widget map
            var def = (_a = this.widgetMap) === null || _a === void 0 ? void 0 : _a[widget];
            if (!def) {
                // check if it's a native HTML tag
                if (!isHtmlTag.hasOwnProperty(widget)) {
                    try {
                        var elStr = document.createElement(widget).toString();
                        isHtmlTag[widget] = !['[object HTMLElement]', '[object HTMLUnknownElement]'].includes(elStr);
                    }
                    catch (err) {
                        isHtmlTag[widget] = false;
                    }
                }
                if (isHtmlTag[widget])
                    return { widget: widget };
                throw new Error("Widget '".concat(widget, "' not defined. Did you define it?"));
            }
            return def;
        }
        // If widget is a component, just return it
        return { widget: widget };
    },
};
export default config;
//# sourceMappingURL=config.js.map