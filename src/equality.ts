import { createBenchmark } from "./benchmark";

const objs: any[] = [];
// Object.prototype.valueOf = function (this: { value: any }) {
//   return this.value;
// };

for (let i = 0; i < 1000; i++) {
  objs.push({
    ["_" + i]: i,
    value: i,
    // valueOf: () => i,
  });
}

(function doBenchmarks(benchmark) {
  (function benchmark1(timer) {
    let sum = false;
    while (timer()) {
      for (let i = 0; i < objs.length; i++) {
        sum = objs[i] === i || sum;
        // if (sum) throw new Error();
      }
    }
  })(benchmark(" =="));

  (function benchmark2(timer) {
    let sum = false;
    while (timer()) {
      for (let i = 0; i < objs.length; i++) {
        sum = objs[i] == i || sum;
        // if (sum) throw new Error();
      }
    }
  })(benchmark("==="));
  benchmark.report();
})(createBenchmark("numbers"));
