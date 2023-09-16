(() => {
  interface Person {
    name: string;
    age: number;
  }

  const person: Person = { name: "Jack", age: 32 };

  console.log("Name:", person.name, "age:", person.age);
})();
