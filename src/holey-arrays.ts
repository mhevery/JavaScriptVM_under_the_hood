import { createBenchmark } from "./benchmark";

class MyArray extends Array {}

const ARRAY_SIZE = 100000;
const arrayNums = [];
const arrayStrings = [];
const myArrayStrings = new MyArray();
const arrayMix = [];
const arrayHoles = [];
const myArrayHolesProto = new MyArray();
const arrayNumHoles = new Array(ARRAY_SIZE);
MyArray.prototype["0"] = 0;
// Uncomment next line to see performance degradation due to prototype pollution
// Array.prototype["0"] = 0;

for (let i = 0; i < ARRAY_SIZE; i++) {
  arrayNums[i] = i;
  arrayStrings[i] = "" + i;
  myArrayStrings[i] = "" + i;
  arrayMix[i] = i % 2 === 0 ? i : "" + i;
  if (i % 2 !== 0) {
    arrayHoles[i] = i % 3 === 0 ? i : "" + i;
    myArrayHolesProto[i] = i % 3 === 0 ? i : "" + i;
  }
  arrayNumHoles[i] = i;
}

(function doBenchmarks(benchmark) {
  let sum = false;
  (function benchmark1(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(arrayNums, benchmark("arrayNums"));

  (function benchmark2(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(arrayStrings, benchmark("arrayStrings"));

  (function benchmark3(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(myArrayStrings, benchmark("myArrayStrings"));

  (function benchmark4(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(arrayMix, benchmark("arrayMix"));

  (function benchmark5(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(arrayHoles, benchmark("arrayHoles"));

  (function benchmark6(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(myArrayHolesProto, benchmark("arrayHolesProto"));

  (function benchmark7(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum = (array[i] as any) === false;
      }
    }
  })(arrayNumHoles, benchmark("arrayNumHoles"));

  benchmark.report();
})(createBenchmark("example3"));
