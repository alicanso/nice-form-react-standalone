/**
 * Delete properties from object, return new object.
 * @param obj
 * @param arr
 * @returns
 */
export declare const without: (obj: Record<string, any>, arr: string[]) => Record<string, any>;
/**
 * Check if a value is undefined.
 * @param value
 * @returns
 */
export declare const isUndefined: (value: any) => boolean;
/**
 * Get value from object by path. The path could be an array or a string
 * separated by dot.
 * @param obj
 * @param prop
 * @returns
 */
export declare const get: (obj: Record<string, any>, prop: string | string[]) => Record<string, any> | undefined;
/**
 * Set value to object by path. The path could be an array or a string separated by dot.
 * @param obj
 * @param prop
 * @returns
 */
export declare const has: (obj: Object, prop: string | string[]) => boolean;
/**
 * Normalize options to { value, label } format. The options could be an array of
 * string, array or object.
 *
 * For example:
 * ['a', 'b'] => [{ value: 'a', label: 'a' }, { value: 'b', label: 'b' }]
 * [['a', 'A'], ['b', 'B']] => [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]
 * [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] => [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]
 * @param options
 * @returns
 */
export declare const normalizeOptions: (options: any[]) => any[];
/**
 * The standard keys for form field meta. These keys are handled by nice form itself.
 * Other fields are handled by adapters.
 */
export declare const niceFormFieldStdKeys: string[];
