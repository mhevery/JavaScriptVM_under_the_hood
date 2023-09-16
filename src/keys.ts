import { createBenchmark } from "./benchmark";

class MyArray extends Array {}

const SIZE = 100;
const obj: Record<string, number> = {};
/**
 *  {
 *  _0: 0,
 *  _1: 1,
 *  _2: 2,
 *  ...
 * }
 */
const array = [];
/**
 *  [
 *  '_0', 0,
 *  '_1', 1,
 *  '_2', 2,
 *  ...
 * }
 */

for (let i = 0; i < SIZE; i++) {
  obj["_" + i] = i;
  array.push("_" + i, i);
}

(function doBenchmarks(benchmark) {
  (function benchmark1(obj, timer) {
    let sum = 0;
    while (timer()) {
      for (const key in obj) {
        sum += obj[key];
      }
    }
  })(obj, benchmark("property"));

  (function benchmark1(obj, timer) {
    let sum = 0;
    while (timer()) {
      const copy = { ...obj };
      for (const key in copy) {
        sum += copy[key];
      }
    }
  })(obj, benchmark("property with copy"));

  (function benchmark2(array, timer) {
    let sum = 0;
    while (timer()) {
      for (let i = 0; i < array.length; i += 2) {
        sum += array[i] as number;
      }
    }
  })(array, benchmark("array"));

  (function benchmark2(array, timer) {
    let sum = 0;
    while (timer()) {
      const copy = array.slice();
      for (let i = 0; i < copy.length; i += 2) {
        sum += copy[i] as number;
      }
    }
  })(array, benchmark("array with copy"));

  benchmark.report();
})(createBenchmark("iteration"));
