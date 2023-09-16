(() => {
  interface Person {
    name: string;
    age: number;
  }

  type HiddenClass = any[];

  const person_HC_0 = [null, "name", "age"];
  const person_HC_1 = [null, "name", "age", "school"];
  const person_HC_2 = [null, "age", "name"];
  // const people: Person[] = [
  //   { name: "Jack", age: 32 },
  //   { name: "Mary", age: 30, school: 'MIT'},
  //   { age: 31, name: "Jain"},
  // ];
  const people: [HiddenClass, ...any][] = [
    [person_HC_0, "Jack", 32],
    [person_HC_1, "Mary", 30, "MIT"],
    [person_HC_2, 30, "Jain"],
  ];

  let avgAge: number = 0;

  for (let i = 0; i < people.length; i++) {
    // avgAge += people[i].age;
    const person = people[i];
    const person_HC = person[0];
    const person_age =
      person[
        person_HC == person_HC_0
          ? 2
          : person_HC == person_HC_1
          ? 2
          : person_HC == person_HC_2
          ? 1
          : person_HC.indexOf("age")
      ];
    avgAge += person_age;
  }

  avgAge /= people.length;

  console.log("Average age:", avgAge);
})();
