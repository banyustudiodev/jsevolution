export class DefaultFunctions {
  before() {
  }
  beforeEach() {
  }
  fitness() {
    return Infinity;
  }
  objective(individual) {
    return this.fitness(individual);
  }
  selection(population) {
    const individual = population.individuals[population.selected];
    population.selected =
      (population.selected + 1) % Math.min(population.individuals.length, population.size);
    return individual;
  }
  mutation(individual) {
    return individual.clone();
  }
  crossover(leftParent, rightParent) {
    if (leftParent.fitness < rightParent.fitness) {
      return leftParent.clone();
    }
    return rightParent.clone();
  }
  afterEach() {
  }
  after() {
  }
}
