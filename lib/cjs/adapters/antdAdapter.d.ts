import { ReactNode } from 'react';
import { FormItemProps } from 'antd';
import { FormListFieldData, FormListOperation } from 'antd/es/form';
import { NiceFormMeta, NiceFormAdapter, NiceFormField } from '../types';
export interface AntdNiceFormField extends NiceFormField, Omit<FormItemProps, 'children' | 'name'> {
    getListItemMeta?: (fields: FormListFieldData[], { add, remove, move }: FormListOperation, { errors }: {
        errors: any[];
    }, index: number) => any;
    addItemButtonLabel?: ReactNode;
}
export interface AntdNiceFormMeta extends NiceFormMeta {
    fields: AntdNiceFormField[];
}
declare const antdAdapter: NiceFormAdapter;
export default antdAdapter;
