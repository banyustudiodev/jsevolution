export class Individual {
  static create(ChromosomeClass, values, fitness, objective) {
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
    return this;
  }
}

export class Population {
  static create(size, ChromosomeClass, individuals) {
    return new Population(size, ChromosomeClass, individuals);
  }
  constructor(size, ChromosomeClass, individuals) {
    this.individuals = [];
    individuals.forEach((v) => {
      this.individuals.push(Individual.create(ChromosomeClass, v));
    });
    this.selected = 0;
    this.size = size;
  }
  add(individual) {
    if (!this.contains(individual)) {
      this.individuals.push(individual);
    }
  }
  contains(individual) {
    const individuals = [];
    this.individuals.forEach((i) => {
      individuals.push(i.chromosome.values.toString());
    });
    return individuals.includes(individual.chromosome.values.toString());
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
  removeWorst(numberIndividuals) {
    this.individuals.sort((l, r) => {
      if (l.fitness < r.fitness) {
        return -1;
      } else if (l.fitness > r.fitness) {
        return 1;
      }
      return 0;
    });
    const bestIndividual = this.getBest();
    let i = numberIndividuals;
    while (i > 0 && this.individuals.length > 2) {
      const individual = this.individuals.pop();
      this.individuals = this.individuals.slice(0, -1);
      if (individual === bestIndividual) {
        this.individuals = [...[individual], ...this.individuals];
      } else {
        i -= 1;
      }
    }
  }
}
