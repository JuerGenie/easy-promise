/**
 * @template T
 * @typedef {T | PromiseLike<T>} MaybePromise
 */

/**
 * @template T
 */
export class EasyPromise {
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
 * @returns {EasyPromise<T>}
 */
export function easyPromise() {
  return new EasyPromise();
}

export default easyPromise;
