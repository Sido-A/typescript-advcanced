///////////////////////////////
//// Generics & Constraints ///
///////////////////////////////
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// Now we can access to the name and string because we told function to use Generics
const mergedObj = merge({ name: "sido" }, { age: 28 });

interface Lengthy {
  length: number;
}

const countNumberOfElement = <T extends Lengthy>(element: T): [T, string] => {
  let desc = "Got no value.";
  let length = element.length;
  if (length === 1) {
    desc = `Got ${element.length} element`;
  } else if (length > 1) {
    desc = `Got ${element.length} elements`;
  }
  return [element, desc];
};

console.log(countNumberOfElement("Hi there!"));

const extractAndConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => {
  return "Value" + obj[key];
};

extractAndConvert({ job: "coder" }, "job");

///////////////////////////////
/////// Generic Classes ///////
///////////////////////////////

//
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Sido");
textStorage.addItem("Abe");
console.log(textStorage);

const numberStorage = new DataStorage<number>();

///////////////////////////////
/// Built in utility types  ///
///////////////////////////////
// Partial
interface CourseGoal {
  title: string;
  desc: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, desc: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.desc = desc;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly
const names: Readonly<string[]> = ["Sido", "Abe"];
// names.push("new name"); you get  error here
