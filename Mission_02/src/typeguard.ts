const add = (num1: number | string, num2: number | string): number | string => {
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};

console.log(add(2, 3));
console.log(add('2', '3'));

type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: 'Admin';
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ('role' in user) {
    console.log(`This ${user.name} and has role ${user.role}`)
  } else {
    console.log(`This user name is ${user.name}`)
  }
}
getUserInfo({name:'Normal'})
getUserInfo({name:'vip',role:'Admin'})