import { createBenchmark } from "./benchmark";

const numbers: number[] = [];
const numbersNan: number[] = [];
const booleans: boolean[] = [];
const strings: string[] = [];
const objs: object[] = [];
const objsMega: object[] = [];
const coercion: object[] = [];
const coercionMega: object[] = [];
const mix: any[] = [];
const mixSelector = [numbers, booleans, strings, objs];

for (let i = 0; i < 1000; i++) {
  numbers.push(i);
  numbersNan.push(i % 2 ? Number.NaN : 1);
  booleans.push(i % 2 == 0);
  strings.push("" + i);
  coercion.push({ valueOf: () => "" + i });
  objs.push({});
  objsMega.push({
    ["_" + i]: i,
  });
  coercionMega.push({
    ["_" + i]: i,
    valueOf: () => "" + i,
  });
  const array = mixSelector[i % mixSelector.length];
  mix.push(array[i]);
}

(function doBenchmarks(benchmark) {
  let sum = 0;
  (function benchmark1(timer) {
    while (timer()) {
      let sum = false;
      for (let i = 0; i < numbers.length; i++) {
        sum = numbers[i] == -1 || sum;
      }
    }
  })(benchmark("=="));

  (function benchmark2(timer) {
    while (timer()) {
      let sum = false;
      for (let i = 0; i < numbers.length; i++) {
        sum = numbers[i] === -1 || sum;
      }
    }
  })(benchmark("==="));
  benchmark.report();
})(createBenchmark("numbers"));
