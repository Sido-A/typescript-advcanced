"use strict";
let user_1;
user_1 = {
    name: "Sido",
    age: 28,
    greet(message) {
        console.log(message);
    },
};
user_1.greet("Hi there!");
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    setAge(age) {
        this.age = age;
    }
    greet(message) {
        console.log(message);
        console.log(`I am ${this.name}, ${this.age}`);
    }
}
let user_2;
user_2 = new Person("Sido", 28);
user_2.greet("Nice to meet you");
let add;
add = (n1, n2) => n1 + n2;
console.log(add(2, 8));
