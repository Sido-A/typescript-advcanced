const Logger = (logString: string) => {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
};

const withTemplate = (template: string, hookId: string) => {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookElm = document.querySelector(hookId);
        if (hookElm) {
          hookElm.innerHTML = template;
          hookElm.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
};

@Logger("Logging here")
@withTemplate("<h1>My H1 tag here </h1>", "#app")
class DecoratorPerson {
  name = "Sido";

  constructor() {
    console.log("Creating person obj");
  }
}

const person = new DecoratorPerson();

const Log = (target: any, propertyName: string | Symbol) => {
  console.log("Property decorator");
  console.log(target, propertyName);
};

const accessorDecorator = (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const methodDecorator = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const parameterDecorator = (
  target: any,
  name: string | Symbol,
  position: number
) => {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
};

class Product {
  @Log
  title: string;
  private _price: number;

  @accessorDecorator
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @methodDecorator
  getPriceWithTax(@parameterDecorator tax: number) {
    return this._price * (1 + tax);
  }
}

const autoBind = (
  _target: any,
  _name: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunc = originalMethod.bind(this);
      return boundFunc;
    },
  };
  return adjustedDescriptor;
};
class Printer {
  message = "This works!";
  @autoBind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);

interface ValidationConfig {
  [property: string]: {
    [validateProp: string]: string[];
  };
}

const registeredValidators: ValidationConfig = {};

const Required = (target: any, propName: string) => {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
};

const PositiveNumber = (target: any, propName: string) => {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
};

const validate = (obj: any) => {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          return !!obj[prop];

        case "positive":
          return obj[prop] > 0;
      }
    }
  }
  return true;
};
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("#courseForm")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInputElm = document.querySelector("#title") as HTMLInputElement;
  const priceInputElm = document.querySelector("#price") as HTMLInputElement;

  const title = titleInputElm.value;
  const price = +priceInputElm.value;

  const createCourse = new Course(title, price);
  if (!validate(createCourse)) {
    alert("Invalid Input");
    return;
  }
});
