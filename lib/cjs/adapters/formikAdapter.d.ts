import { ReactNode } from 'react';
import { FormikHandlers } from 'formik';
import { NiceFormAdapter } from '../types';
export interface FormikWidgetProps extends Record<string, any> {
    onChange?: FormikHandlers['handleChange'];
    onBlur?: FormikHandlers['handleBlur'];
    children?: ReactNode;
    disabled?: boolean;
    label?: ReactNode;
    fullWidth?: boolean;
}
declare const formikAdapter: NiceFormAdapter;
export default formikAdapter;
