# 1. 什么是`simple-promising`？

`simple-promising`是一个简单的`Promise`工具模块，用于提供简易的模式用来管理`Promise`何时`resolve`和何时`reject`，并且可以方便的对任何东西进行`Promisify`。

# 2. 如何使用`simple-promising`？

使用`simple-promising`非常简单。您可以通过以下方式安装：

```bash
npm install simple-promising
```

然后，您可以在您的项目中使用以下代码导入`simple-promising`：

```javascript
import simplePromising from 'simple-promising';
```

或者，您可以使用以下代码导入`SimplePromising`类：

```javascript
import { SimplePromising } from 'simple-promising';
```

# 3. `API`和示例代码

## `SimplePromising`类

`SimplePromising`类是一个自定义的`Promise`类，它提供了一种简单的模式来管理`Promise`何时`resolve`和何时`reject`。

### 构造函数

> ```javascript
> constructor()
> ```
>
> 创建一个新的`SimplePromising`实例。

### 属性

> ```javascript
> resolve: (value: MaybePromise<T>) => void;
> ```
>
> 一个函数，用于将`SimplePromising`实例的状态设置为`fulfilled`。

> ```javascript
> reject: (reason: any) => void;
> ```
>
> 一个函数，用于将`SimplePromising`实例的状态设置为`rejected`。

> ```javascript
> promise: Promise<T>;
> ```
>
> 一个`Promise`实例，用于表示`SimplePromising`实例的状态。

### 示例代码

```javascript
import { SimplePromising } from 'simple-promising';

const myPromise = new SimplePromising();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## `simplePromising`函数

`simplePromising`函数是一个工厂函数，用于创建一个新的`SimplePromising`实例。

### 返回值

```javascript
SimplePromising<T>
```

一个新的`SimplePromising`实例。

### 示例代码

```javascript
import { simplePromising } from 'simple-promising';

const myPromise = simplePromising();

myPromise.resolve('Hello, world!');

myPromise.promise.then((value) => {
  console.log(value); // Output: 'Hello, world!'
});
```

## 使用示例

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

### 等待事件

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
