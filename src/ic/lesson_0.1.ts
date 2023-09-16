(() => {
  interface Person {
    name: string;
    age: number;
  }

  type HiddenClass = any[];
  //const person: Person = { name: "Jack", age: 32 };
  const person_hc_0 = [null, "name", "age"];
  const person: [HiddenClass, ...any] = [person_hc_0, "Jack", 32];

  // console.log("Name:", person.name, "age:", person.age);
  const person_HC = person[0];
  const person_name = person[person_HC.indexOf("name")];
  const person_age = person[person_HC.indexOf("age")];
  console.log("Name:", person_name, "age:", person_age);
})();
