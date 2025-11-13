let anything: any;

anything = 222;
(anything as number).toExponential(3);
// ফমস্যা হলো যদি কোনো স্ট্রিংকে নাম্বার হিসেবে assertion করলে  ভুল টাইপ সাজেশন দিবে
anything = 'Asad';
(anything as number).toFixed //এখানে নাম্বারের টাইপ সাজেশন দিচ্ছে
const kgToGMConverter = (input: string | number):string | number | undefined=>{
  if (typeof input === 'number') {
    return input * 1000;
  } else if (typeof input === 'string') {
    return Number(input.split(' ')[0]) * 2000;
  }
}

const result1 = kgToGMConverter(2) as number;
const result2 = kgToGMConverter('2 kg') as number;
console.log(result1,result2)