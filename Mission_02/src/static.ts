class Counter {
 static count: number = 0;
  increment() {
    return ++Counter.count;
  }
  decrement() {
    return --Counter.count
  }
}

const instance1 = new Counter();
const instance2 = new Counter();
console.log(instance1.increment())
console.log(instance1.increment())
console.log(instance2.increment())
console.log(instance2.increment())