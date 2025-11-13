interface Developer<T> {
  name: string;
  salary: number;
  device: {
    brand: string;
    model: string;
    releasingYear: string;
  };
  smartWatch: T;
}

const poorDeveloper: Developer<{
  measureHeartRate: string;
  stopWatch: boolean;
}> = {
  name: 'Asad',
  salary: 44000,
  device: {
    brand: 'Samsung',
    model: 'S21 fe',
    releasingYear: '2021',
  },
  smartWatch: {
    measureHeartRate: '333',
    stopWatch: true,
  },
};
interface WatchFeature {
  measureHeartRate: string;
  stopWatch: boolean;
  callFeature: boolean;
  aiFeature: boolean;
}
const richDeveloper: Developer<WatchFeature> = {
  name: 'Asad',
  salary: 44000,
  device: {
    brand: 'Samsung',
    model: 'S21 fe',
    releasingYear: '2021',
  },
  smartWatch: {
    measureHeartRate: '333',
    stopWatch: true,
    callFeature: true,
    aiFeature: true,
  },
};

console.log(richDeveloper);