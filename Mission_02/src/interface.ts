interface IUser {
  Name: string;
  Age: number;
  isMarried: boolean;
}
// we can extend user interface
interface IUserWithRole extends IUser {
  role:'admin' | 'user'
}

const user1: IUserWithRole = {
  Name: 'Asad',
  Age: 23,
  isMarried: false,
  role:'admin'
}
// interface array , object and function er jonno use kora jay

//object er size choto hole type and boro hole interfce use kora valo


type User = {
  Name: string,
  Age: number,
  isMarried:boolean
}
type Role = {
  role:'admin' | 'user'
}
type UserWithRole = User & Role;

const user2: UserWithRole = {
  Name: 'Asad',
  Age: 23,
  isMarried: false,
  role:'admin'
}

type Add = (num1: number, num2: number) => number;

const AddTwoNumber: Add = (num1,num2) => {
  return num1 + num2;
}

console.log(AddTwoNumber(4,4))
//primitive data er jonno inerface use kora jay na like
type IsAdmin = boolean;
const isAdmin: IsAdmin = false;