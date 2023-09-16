(() => {
  interface Person {
    name: string;
    age: number;
  }

  const people: Person[] = [
    { name: "Jack", age: 32 },
    { name: "Mary", age: 30 },
  ];

  let avgAge: number = 0;

  for (let i = 0; i < people.length; i++) {
    avgAge += people[i].age;
  }

  avgAge /= people.length;

  console.log("Average age:", avgAge);
})();
