class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getSleep(numberOfHour: number) {
    console.log(`${this.name} regular ${numberOfHour} sleeps`);
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }
  doStudy(numberOfHour: number) {
    console.log(`${this.name} study ${numberOfHour} hours regularly`);
  }
}

class Teacher extends Person {
  constructor(name: string) {
    super(name);
  }
  takeClass(numberOfHour: number) {
    console.log(`${this.name} regular take class ${numberOfHour} hour`);
  }
}

const getUserInfo = (user: Person) => {
  if (user instanceof Student) {
    user.doStudy(10)
  } else if (user instanceof Teacher) {
    user.takeClass(4)
  } else {
    user.getSleep(6)
  }
};

const student1 = new Student('Mr . Student');
const teacher1 = new Teacher('Mr. Teacher');
const person1 = new Person('Mr. X')

getUserInfo(student1);
getUserInfo(teacher1);
getUserInfo(person1)
