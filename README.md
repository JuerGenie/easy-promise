# 1. What is `simple-promising`?

`simple-promising` is a simple `Promise` utility module that provides an easy pattern for managing when a `Promise` should `resolve` and when it should `reject`, and can easily `promisify` anything.

# 2. How to use `simple-promising`?

Using `simple-promising` is very simple. You can install it by running the following command:

```bash
npm install simple-promising
```

Then, you can import `simple-promising` into your project with the following code:

```javascript
import simplePromising from 'simple-promising';
```

Alternatively, you can import the `SimplePromising` class with the following code:

```javascript
import { SimplePromising } from 'simple-promising';
```

# 3. `API` and example code

## `SimplePromising` class

The `SimplePromising` class is a custom `Promise` class that provides a simple pattern for managing when a `Promise` should `resolve` and when it should `reject`.

### Constructor

> ```javascript
> constructor()
> ```
>
> Creates a new instance of `SimplePromising`.

### Properties

> ```javascript
> resolve: (value: MaybePromise<T>) => void;
> ```
>
> A function that sets the state of the `SimplePromising` instance to `fulfilled`.

> ```javascript
> reject: (reason: any) => void;
> ```
>
> A function that sets the state of the `SimplePromising` instance to `rejected`.

> ```javascript
> promise: Promise<T>;
> ```
>
> A `Promise` instance that represents the state of the `SimplePromising` instance.

### Example code

```javascript
import { SimplePromising } from 'simple-promising';

const myPromise = new SimplePromising();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## `simplePromising` function

The `simplePromising` function is a factory function that creates a new `SimplePromising` instance.

### Return value

```javascript
SimplePromising<T>
```

A new `SimplePromising` instance.

### Example code

```javascript
import { simplePromising } from 'simple-promising';

const myPromise = simplePromising();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## Usage examples

### `Promisify`

```javascript
import simplePromising from "simple-promising";

function doSomething(cb) {
  setTimeout(() => {
    cb(null, "Hello world!");
  }, 500);
}

const sp = simplePromising();
doSomething((err, value) => err ? sp.reject(err) : sp.resolve(value));
console.log(await sp.promise);
```

### Wait for event

```javascript
import simplePromising from "simple-promising";
import { EventEmitter } from "eventemitter3";

const ee = new EventEmitter();

function when(event) {
  const sp = simplePromising();
  ee.once(event, (...args) => sp.resolve(args));
  return sp.promise;
}

when("ready").then((args) => {
  console.log("It's ok!", args);
});

setTimeout(() => {
  ee.emit("ready", "42");
});

// Output: 'It's ok!' '42'
```

```