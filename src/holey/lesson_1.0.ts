(() => {
  interface HiddenClass {
    indexOf(key: any): number;
  }
  type VMObject<T> = [HiddenClass, /*VMObject*/ any, ...Array<T | HOLE>];

  const HIDDEN_CLASS = 0;
  const PROTO = 1;
  const HOLE = Symbol("HOLE");
  type HOLE = typeof HOLE;

  //////////////////////////////////////////

  // Array.prototype["2"] = -3;
  const array_HC_0 = [null, null, "2"];
  const arrayPrototype: VMObject<number> = [array_HC_0, null, -3];

  const array_HC_1 = {
    indexOf(index: number) {
      return index + 2;
    },
  };
  // const array = [1, 2, , 3];
  const array: VMObject<number> = [array_HC_1, arrayPrototype, 1, 2, HOLE, 3];

  let sum = 0;
  for (let i = 0; i < array.length - 2; i++) {
    let value = array[array[HIDDEN_CLASS].indexOf(i)];

    // CODE TO DEAL WITH HOLES
    let protoArray: VMObject<any> | undefined = array;
    while (value == HOLE && protoArray) {
      protoArray = protoArray[PROTO];
      if (protoArray) {
        const idx = array[PROTO][HIDDEN_CLASS].indexOf(String(i));
        console.log("   HOLE", idx, protoArray);
        value = protoArray[idx];
      } else {
        value = undefined;
      }
    }
    ////////////////////

    console.log("VALUE", i, value);
    if (typeof value == "number") {
      sum += value;
    }
  }
  console.log("Sum:", sum);
})();
