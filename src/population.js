export class Individual {
  static create(ChromosomeClass, values, fitness = Infinity, objective = fitness) {
    return new Individual(ChromosomeClass.create(values), fitness, objective);
  }
  constructor(chromosome, fitness, objective) {
    this.chromosome = chromosome;
    this.fitness = fitness;
    this.objective = objective;
  }
  clone() {
    const cloned = Object.assign(Object.create(this), this);
    cloned.chromosome = this.chromosome.clone();
    return cloned;
  }
  update(functions) {
    this.fitness = functions.fitness(this);
    this.objective = functions.objective(this);
  }
}

export class Population {
  static create(size, ChromosomeClass, individuals) {
    return new Population(size, ChromosomeClass, individuals);
  }
  constructor(size, ChromosomeClass, individuals) {
    this.individuals = [];
    individuals.forEach((values) => {
      this.individuals.push(Individual.create(ChromosomeClass, values));
    });
    this.selection = 0;
    this.size = size;
  }
  add(individual) {
    if (!this.exists(individual)) {
      if (this.full()) {
        this.removeWorstFittest();
      }
      if (!this.full()) {
        this.individuals.push(individual);
      }
    }
  }
  full() {
    return this.individuals.length === this.size;
  }
  exists(individual) {
    const individuals = [];
    this.individuals.forEach((i) => {
      individuals.push(i.chromosome.values.toString());
    });
    return individuals.includes(individual.chromosome.values.toString());
  }
  select() {
    const individual = this.individuals[this.selection];
    this.selection = (this.selection + 1) % this.individuals.length;
    return individual;
  }
  getBest() {
    let individual = {
      objective: Infinity,
    };
    this.individuals.forEach((i) => {
      if (i.objective < individual.objective) {
        individual = i;
      }
    });
    return individual;
  }
  sort() {
    this.selection = 0;
    this.individuals.sort((left, right) => {
      if (left.fitness < right.fitness) {
        return -1;
      } else if (left.fitness > right.fitness) {
        return 1;
      }
      return 0;
    });
  }
  removeWorstFittest(numberIndividuals = 1) {
    this.sort();
    const bestIndividual = this.getBest();
    let i = numberIndividuals;
    while (i > 0 && this.individuals.length > 2) {
      const individual = [].concat(this.individuals).pop();
      this.individuals = this.individuals.slice(0, -1);
      if (individual === bestIndividual) {
        this.individuals = [individual].concat(this.individuals);
      } else {
        i -= 1;
      }
    }
  }
}
