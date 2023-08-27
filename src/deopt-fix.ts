import { createBenchmark } from "./benchmark";
import { benchA, benchB, benchC, benchD } from "./deopt";
const benchmark = createBenchmark("example2");

let timeA = benchmark("A");
while (timeA()) {
  benchA();
}

let timeB = benchmark("B");
while (timeB()) {
  benchB();
}

let timeC = benchmark("C");
while (timeC()) {
  benchC();
}

let timeD = benchmark("D");
while (timeD()) {
  benchD();
}

benchmark.report();
