import { ReactNode } from 'react';
import { NiceFormMeta, NiceFormField } from './types';
/**
 * The layout component of NiceForm based on css grid. It's only used internally.
 * @param param0
 * @returns
 */
declare const FormLayout: React.FC<{
    elements: {
        element: ReactNode;
        field: NiceFormField;
    }[];
    meta: NiceFormMeta;
}>;
export default FormLayout;
