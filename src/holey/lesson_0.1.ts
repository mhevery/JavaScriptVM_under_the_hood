(() => {
  const array = [1, 2, , 3];
  Array.prototype["2"] = -3;

  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (typeof value == "number") {
      sum += value;
    }
  }
  console.log("Sum:", sum);
})();
