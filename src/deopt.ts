const COUNT = Number.parseInt(process.argv[2] || "10");
console.log(`Running ${COUNT} iterations.`);

let value = 0;
export function benchA() {
  value = value === 0 ? 0 : 1;
}
export function benchB() {
  value = value === 0 ? 0 : 2;
}
export function benchC() {
  value = value === 0 ? 0 : 3;
}
export function benchD() {
  value = value === 0 ? 0 : 4;
}

//benchmark('-------------------------- IGNORE --------------------------', benchA);

if (require.main === module) {
  benchmark("A", benchA);
  benchmark("B", benchB);
  benchmark("C", benchC);
  benchmark("D", benchD);
}

/////////////////////

function benchmark(name: string, fn: () => void) {
  console.log("Starting:", name, "...");
  const start = performance.now();
  for (let i = 0; i < COUNT; i++) {
    fn();
  }
  const duration = performance.now() - start;
  console.log(
    "         ",
    name,
    Number((duration / COUNT) * 1000 * 1000).toFixed(3),
    "us"
  );
}
