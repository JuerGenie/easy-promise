/**
 * @template T
 * @returns {SimplePromising<T>}
 */
export function simplePromising<T>(): SimplePromising<T>;
/**
 * @template T
 * @typedef {T | PromiseLike<T>} MaybePromise
 */
/**
 * @template T
 */
export class SimplePromising<T> {
    /**
     * @type {(value: MaybePromise<T>) => void}
     * @param {MaybePromise<T>} value
     */
    resolve: (value: MaybePromise<T>) => void;
    /**
     * @type {(reason: any) => void}
     * @param {any} reason
     */
    reject: (reason: any) => void;
    /**
     * @type {Promise<T>}
     */
    promise: Promise<T>;
}
export default simplePromising;
export type MaybePromise<T> = T | PromiseLike<T>;
