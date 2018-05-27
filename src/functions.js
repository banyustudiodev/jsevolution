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
