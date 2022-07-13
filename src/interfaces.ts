// interface Person {
//   name: string;
//   age: number;

//   greet(message: string): void;
// }

// let user_1: Person;

// user_1 = {
//   name: "Sido",
//   age: 28,
//   greet(message: string): void {
//     console.log(message);
//   },
// };
// user_1.greet("Hi there!");

interface Greetable {
  name: string;
  greet(message: string): void;
}

class Person implements Greetable {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  setAge(age: number) {
    this.age = age;
  }

  greet(message: string): void {
    console.log(message);
    console.log(`I am ${this.name}, ${this.age}`);
  }
}

let user_2: Greetable;
user_2 = new Person("Sido", 28);
user_2.greet("Nice to meet you");

interface Sums {
  (a: number, b: number): number;
}

let add: Sums;
add = (n1: number, n2: number) => n1 + n2;
console.log(add(2, 8));
