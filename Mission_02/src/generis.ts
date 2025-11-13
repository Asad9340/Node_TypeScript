// same type is using again and again so we can dynamic this array

type GenericArray<T> = Array<T>;

// const friends: string[] = ['Mr. X', 'Mr. Y'];
// const friends: Array<string> = ['Mr. X', 'Mr. Y'];
const friends: GenericArray<string> = ['Mr. X', 'Mr. Y'];
// const rollNumber: number[] = [3, 4, 5, 6];
// const rollNumber: Array<number> = [3, 4, 5, 6];
const rollNumber: GenericArray<number> = [3, 4, 5, 6];
// const isEligibleList: boolean[] = [true, false, true];
// const isEligibleList: Array<boolean> = [true, false, true];
const isEligibleList: GenericArray<boolean> = [true, false, true];

type Coordinates<X, Y> = [X, Y];

const coordinates1: Coordinates<number, number> = [40, 50];
const coordinates2: Coordinates<string, string> = ['40', '50'];

const userList: GenericArray<{ name: string; age: number }> = [
  {
    name: 'Asad',
    age: 44,
  },
];
