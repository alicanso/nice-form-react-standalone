import { NiceFormMeta, NiceFormField } from './types';
/**
 * FormField only manages the layout of the field, and delegates the rendering of the field to the adapter.
 *
 * @param param0
 * @returns
 */
declare const FormField: ({ meta, field, }: {
    meta: NiceFormMeta;
    field: NiceFormField;
}) => React.ReactNode;
export default FormField;
