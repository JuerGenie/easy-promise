/**
 * @template T
 * @typedef {T | PromiseLike<T>} MaybePromise
 */

/**
 * @template T
 */
export class SimplePromising {
  /**
   * @type {(value: MaybePromise<T>) => void}
   * @param {MaybePromise<T>} value
   */
  resolve;
  /**
   * @type {(reason: any) => void}
   * @param {any} reason
   */
  reject;
  /**
   * @type {Promise<T>}
   */
  promise;

  constructor() {
    /** @type {null | ((value: MaybePromise<T>) => void)} */
    let resolve = null;
    /** @type {null | ((reason: any) => void)} */
    let reject = null;

    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    if (!resolve || !reject) {
      throw new TypeError("Promise constructor failed.");
    }

    this.resolve = resolve;
    this.reject = reject;
  }
}

/**
 * @template T
 * @returns {SimplePromising<T>}
 */
export function simplePromising() {
  return new SimplePromising();
}

export default simplePromising;
