type RichPeopleVehicle = {
  car: string;
  bike: string;
  cng: string;
};

type MyVehicle1 = 'bike' | 'car' | 'cng';

type MyVehicle2 = keyof RichPeopleVehicle;

const MyVehicle: MyVehicle2 = 'bike';

console.log(MyVehicle);
type User = {
  id: number;
  name: string;
  address: {
    city: string;
  };
};
const user: User = {
  id: 222,
  name: 'Asad',
  address: {
    city: 'tangail',
  },
};

const myId = user.id;
const myName = user['name'];

const getPropertyFromObj =<T> (obj:T, key: keyof T) => {
  return obj[key];
};
const result = getPropertyFromObj(user, 'name');

// console.log(result);

const student = {
  id: 333,
  class:'four'
}

const result2 = getPropertyFromObj(student, 'class');

console.log(result2)