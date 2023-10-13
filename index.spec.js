import test from "ava";
import { SimplePromising } from "./index.js";

test("SimplePromising: create an instance", (t) => {
  t.plan(1);
  t.notThrows(() => {
    new SimplePromising();
  });
});

test("SimplePromising: resolve with value", async (t) => {
  t.plan(1);
  const ep = new SimplePromising();
  setTimeout(() => {
    ep.resolve("Hello, world!");
  });
  const result = await ep.promise;
  t.is(result, "Hello, world!");
});

test("SimplePromising: resolve with promise", async (t) => {
  t.plan(1);
  const ep = new SimplePromising();
  setTimeout(() => {
    ep.resolve(Promise.resolve("Hello, world!"));
  });
  const result = await ep.promise;
  t.is(result, "Hello, world!");
});

test("SimplePromising: reject with error", async (t) => {
  t.plan(1);
  const ep = new SimplePromising();
  const error = new TypeError("Something went wrong");
  setTimeout(() => {
    ep.reject(error);
  });
  try {
    await ep.promise;
  } catch (err) {
    t.is(err, error);
  }
});

test("SimplePromising: resolve with value after 1sec delay", async (t) => {
  t.plan(1);
  const ep = new SimplePromising();
  setTimeout(() => {
    ep.resolve("Hello, world!");
  }, 1000);
  const result = await ep.promise;
  t.is(result, "Hello, world!");
});

test("SimplePromising: reject with error after 1sec delay", async (t) => {
  t.plan(1);
  const ep = new SimplePromising();
  const error = new TypeError("Something went wrong");
  setTimeout(() => {
    ep.reject(error);
  }, 1000);
  try {
    await ep.promise;
  } catch (err) {
    t.is(err, error);
  }
});
