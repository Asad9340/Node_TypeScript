class Person {
  getSleep() {
    console.log('This person sleep 8 hours');
  }
}

class Student extends Person {
  getSleep() {
    console.log('I am a student. I sleep for 7 hours');
  }
}

class NextLevelDeveloper extends Person {
  getSleep() {
    console.log('I am a next level developer. I sleep 6 hours');
  }
}

const getSleepHours = (param: Person) => {
  param.getSleep();
};

const person1 = new Person();
const person2 = new Student();
const person3 = new NextLevelDeveloper();

// getSleepHours(person1)
// getSleepHours(person2)
// getSleepHours(person3)

class Shape {
  getArea():number {
    return 0;
  }
}
class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  height: number;
  width: number;
  constructor(height:number,width:number) {
    super();
    this.height = height;
    this.width = width;
  }
  getArea(): number {
    return this.height * this.width;
  }
}

const getAreaOfShape = (param: Shape) => {
  console.log(param.getArea())
}

const circle1 = new Circle(5);
const rectangle1 = new Rectangle(5,3);

getAreaOfShape(circle1);
getAreaOfShape(rectangle1);