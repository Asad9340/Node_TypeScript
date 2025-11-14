
class Person {
  name: string;
  age: number;
  address: string;
  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}
class Student extends Person {
  GetSleep(time: number) {
    console.log(`${this.name} sleeps ${time} hour`);
  }
}

const student1 = new Student('Mr. X', 18, 'Tangail');
student1.GetSleep(6);

class Teacher extends Person{
  designation:string
  constructor(name:string, age:number, address:string,designation: string) {
    super(name, age, address);
    this.designation= designation
  }
  TakeClass() {
    console.log(`${this.name} take classes`)
  }
}

const teacher1 = new Teacher('Mr. Y', 26, 'Tangail', 'Professor');
teacher1.TakeClass();
