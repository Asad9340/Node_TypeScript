type RichPeople = {
  car: string;
  bike: string;
  cng: string;
}

type keyOfType = keyof RichPeople;

const test: keyOfType = "bike";