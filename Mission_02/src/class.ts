class Animal {
  // name: string;
  // species: string;
  // sound: string;

  // constructor(name: string, species: string, sound: string) {
  //   this.name = name;
  //   this.species = species;
  //   this.sound = sound;
  // }

  constructor(
    public name: string,
    public species: string,
    public sound: string
  ) {}
  PrintSound() {
    console.log(
      `The ${this.name} make sound like ${this.sound} that's species name is ${this.species}`
    );
  }
}

const dog = new Animal('Black Dog', 'Bangla', 'ghew ghew');

dog.PrintSound();
