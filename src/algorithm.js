export class RandomNumber {
  static init(seed = 0) {
    RandomNumber.i = 0;
    RandomNumber.j = 0;
    RandomNumber.keystream = RandomNumber.keyStream(`${seed}`);
  }
  static keyStream(key) {
    const S = [];
    let j = 0;
    for (let i = 0; i < 256; i += 1) {
      S[i] = i;
    }
    for (let k = 0; k < 256; k += 1) {
      j = (j + S[k] + key[k % key.length].charCodeAt(0)) % 256;
      const swap = S[k];
      S[k] = S[j];
      S[j] = swap;
    }
    return S;
  }
  static randomByte() {
    RandomNumber.i = (RandomNumber.i + 1) % 256;
    RandomNumber.j = (RandomNumber.j + RandomNumber.keystream[RandomNumber.i]) % 256;
    const swap = RandomNumber.keystream[RandomNumber.i];
    RandomNumber.keystream[RandomNumber.i] = RandomNumber.keystream[RandomNumber.j];
    RandomNumber.keystream[RandomNumber.j] = swap;
    return RandomNumber.keystream[
      (RandomNumber.keystream[RandomNumber.i] + RandomNumber.keystream[RandomNumber.j]) % 256
    ];
  }
  static get() {
    if (!RandomNumber.keystream) {
      RandomNumber.init('seed');
    }
    const random = (
      (RandomNumber.randomByte()) +
      (RandomNumber.randomByte() * 256) +
      (RandomNumber.randomByte() * 65536) +
      (RandomNumber.randomByte() * 16777216) +
      (RandomNumber.randomByte() * 4294967296) +
      (RandomNumber.randomByte() * 1099511627776) +
      (RandomNumber.randomByte() * 281474976710656) +
      (RandomNumber.randomByte() * 72057594037927940)
    ) / 18446744073709551616;
    return random;
  }
  static getInteger(max) {
    return Math.floor(RandomNumber.get() * max);
  }
}

export class GeneticAlgorithm {
  static run(
    population, generations, Functions,
    mutationProbability = 0.5, crossoverProbability = 0.5, seed = 0,
  ) {
    RandomNumber.init(seed);
    const geneticAlgorithm = new GeneticAlgorithm(
      population, Functions, generations,
      mutationProbability, crossoverProbability, seed,
    );
    geneticAlgorithm.evolve();
    return geneticAlgorithm;
  }
  constructor(population, generations, Functions, mutationProbability, crossoverProbability) {
    this.iterations = 0;
    this.stopped = false;
    this.population = population;
    this.functions = new Functions();
    this.population.individuals.forEach((i) => {
      i.update(this.functions);
    });
    this.generations = generations;
    this.mutationProbability = mutationProbability;
    this.crossoverProbability = crossoverProbability;
  }
  evolve() {
    this.functions.before(this);
    while (this.hasNext() && !this.hasStopped()) {
      this.functions.beforeEach(this);
      this.next();
      this.functions.afterEach(this);
    }
    this.functions.after(this);
  }
  next() {
    if (this.iterations < this.generations) {
      for (let i = 0; i < this.population.size; i += 1) {
        if (RandomNumber.get() < this.mutationProbability) {
          this.mutation();
        }
        if (RandomNumber.get() < this.crossoverProbability) {
          this.crossover();
        }
      }
      if (this.population.individuals.length > this.population.size) {
        this.population.removeWorst(this.population.individuals.length - this.population.size);
      }
      this.iterations = this.iterations + 1;
    }
  }
  hasNext() {
    return this.iterations < this.generations;
  }
  stop() {
    this.stopped = true;
  }
  hasStopped() {
    return this.stopped;
  }
  mutation() {
    const individual = this.functions.mutation(this.population.select());
    individual.update(this.functions);
    this.population.add(individual);
  }
  crossover() {
    const individual = this.functions.crossover(this.population.select(), this.population.select());
    individual.update(this.functions);
    this.population.add(individual);
  }
}
