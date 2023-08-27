import {createBenchmark} from './benchmark';

const ARRAY_SIZE = 10000;
const array1 = [];  // {value,prop_0}, {value,prop_0}, {value,prop_0}, {value,prop_0},
const array2 = [];  // {value,prop_0}, {value,prop_1}, {value,prop_0}, {value,prop_1},
const array3 = [];  // {value,prop_0}, {value,prop_1}, {value,prop_2}, {value,prop_0},
const array4 = [];  // {value,prop_0}, {value,prop_1}, {value,prop_2}, {value,prop_3},
const array5 = [];
const array6 = [];
const array7 = [];
const array10 = [];
const array100 = [];
const array1000 = [];
const array10000 = [];

for (let i = 0; i < ARRAY_SIZE; i++) {
  array1.push({value: 0, [uniqueName(i, 1)]: false});
  array2.push({value: 0, [uniqueName(i, 2)]: false});
  array3.push({value: 0, [uniqueName(i, 3)]: false});
  array4.push({value: 0, [uniqueName(i, 4)]: false});
  array5.push({value: 0, [uniqueName(i, 5)]: false});
  array6.push({value: 0, [uniqueName(i, 6)]: false});
  array7.push({value: 0, [uniqueName(i, 7)]: false});
  array10.push({value: 0, [uniqueName(i, 10)]: false});
  array100.push({value: 0, [uniqueName(i, 100)]: false});
  array1000.push({value: 0, [uniqueName(i, 1000)]: false});
  array10000.push({value: 0, [uniqueName(i, 10000)]: false});
}
function uniqueName(index: number, shapesCount: number): string {
  return 'prop_' + (index % shapesCount);
}

(function doBenchmarks(benchmark) {
  let sum = 0;
  (function benchmark1(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array1, benchmark('1'));

  (function benchmark2(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array2, benchmark('2'));

  (function benchmark3(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array3, benchmark('3'));

  (function benchmark4(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array4, benchmark('4'));

  (function benchmark5(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array5, benchmark('5'));

  (function benchmark6(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array6, benchmark('6'));

  (function benchmark7(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array7, benchmark('7'));

  (function benchmark10(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array10, benchmark('10'));

  (function benchmark100(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array100, benchmark('100'));

  (function benchmark1000(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array1000, benchmark('1000'));

  (function benchmark10000(array, timer) {
    while (timer()) {
      for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
      }
    }
  })(array10000, benchmark('10000'));

  benchmark.report();
})(createBenchmark('example3'));
