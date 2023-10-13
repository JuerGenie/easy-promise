# 1. What is `easy-promise`?

`easy-promise` is a simple `Promise` utility module that provides an easy pattern for managing when a `Promise` should `resolve` and when it should `reject`, and can easily `promisify` anything.

# 2. How to use `easy-promise`?

Using `easy-promise` is very simple. You can install it by running the following command:

```bash
npm install easy-promise
```

Then, you can import `easy-promise` into your project with the following code:

```javascript
import easyPromise from 'easy-promise';
```

Alternatively, you can import the `EasyPromise` class with the following code:

```javascript
import { EasyPromise } from 'easy-promise';
```

# 3. `API` and example code

## `EasyPromise` class

The `EasyPromise` class is a custom `Promise` class that provides a simple pattern for managing when a `Promise` should `resolve` and when it should `reject`.

### Constructor

> ```javascript
> constructor()
> ```
>
> Creates a new instance of `EasyPromise`.

### Properties

> ```javascript
> resolve: (value: MaybePromise<T>) => void;
> ```
>
> A function that sets the state of the `EasyPromise` instance to `fulfilled`.

> ```javascript
> reject: (reason: any) => void;
> ```
>
> A function that sets the state of the `EasyPromise` instance to `rejected`.

> ```javascript
> promise: Promise<T>;
> ```
>
> A `Promise` instance that represents the state of the `EasyPromise` instance.

### Example code

```javascript
import { EasyPromise } from 'easy-promise';

const myPromise = new EasyPromise();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## `easyPromise` function

The `easyPromise` function is a factory function that creates a new `EasyPromise` instance.

### Return value

```javascript
EasyPromise<T>
```

A new `EasyPromise` instance.

### Example code

```javascript
import { easyPromise } from 'easy-promise';

const myPromise = easyPromise();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## Usage examples

### Promisify

```javascript
import easyPromise from "easy-promise";

function doSomething(cb) {
  setTimeout(() => {
    cb(null, "Hello world!");
  }, 500);
}

const ep = easyPromise();
doSomething((err, value) => err ? ep.reject(err) : ep.resolve(value));
console.log(await ep.promise);
```

### Wait for event

```javascript
import easyPromise from "easy-promise";
import { EventEmitter } from "eventemitter3";

const ee = new EventEmitter();

function when(event) {
  const ep = easyPromise();
  ee.once(event, (...args) => ep.resolve(args));
  return ep.promise;
}

when("ready").then((args) => {
  console.log("It's ok!", args);
});

setTimeout(() => {
  ee.emit("ready", "42");
});

// Output: 'It's ok!' '42'
```
