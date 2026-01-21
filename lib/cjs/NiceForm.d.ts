import { ReactElement } from 'react';
import { NiceFormMeta, ReactComponent, FieldMetaConverter } from './types';
import { NiceFormAdapter } from './types';
/**
 * @description The component accepts meta parameter and renders the whole form.
 * @component
 */
declare const NiceForm: {
    ({ meta }: {
        meta: NiceFormMeta;
    }): ReactElement | null;
    useUpdateOnChange(fields: string | string[][] | string[]): (changedValues: Object) => void;
    addAdapter(adapter: NiceFormAdapter): void;
    defineWidget(name: string, widget: ReactComponent, metaConverter?: FieldMetaConverter): void;
    getFieldValue(fieldName: string, meta: NiceFormMeta, ...args: any[]): any;
};
export default NiceForm;
