import { FormikProps } from 'formik';
import { NiceFormMeta, NiceFormAdapter, NiceFormField } from '../types';
export interface FormikMuiNiceFormMeta extends NiceFormMeta {
    form?: FormikProps<any>;
}
export interface FormikMuiNiceFormField extends NiceFormField {
    fullWidth?: boolean;
}
declare const formikAdapter: NiceFormAdapter;
export default formikAdapter;
