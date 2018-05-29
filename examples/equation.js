import { IntegerChromosome, Population, DefaultFunctions, RandomNumber, GeneticAlgorithm } from './jsevolution';

class CustomFunctions extends DefaultFunctions {
  // Own custom function to optimize for
  equation([x, y, z]) {
    return ((4 * (x ** 3)) - (8 * (y ** 2))) + (7 * z);
  }

  // Before hook called by genetic algorithm
  before() {
    console.log(`
      =============================================================================
      Running genetic algorithm to optimize for 4x³-8y²+7z≈0 with x,y,z ∈ {1,...,9}
      =============================================================================
    `);
  }

  // Fitness function called by genetic algorithm
  fitness(individual) {
    // Fitness is absolute distance to zero
    return Math.abs(this.equation(individual.chromosome.values));
  }

  // Selection function called by genetic algorithm
  selection(population) {
    // Random selection
    population.selected = RandomNumber.getInteger(population.individuals.length - 1);

    return population.individuals[population.selected];
  }

  // Mutation function called by genetic algorithm
  mutation(individual) {
    // Clone individual
    const cloned = individual.clone();

    // Swap two random values as mutation
    cloned.chromosome.swap(
      RandomNumber.getInteger(individual.chromosome.values.length - 1),
      RandomNumber.getInteger(individual.chromosome.values.length - 1),
    );

    return cloned;
  }

  // Crossover function called by genetic algorithm
  crossover(leftParent, rightParent) {
    // Clone left parent
    const cloned = leftParent.clone();

    // Random index
    const cut = RandomNumber.getInteger(cloned.chromosome.values.length - 1);

    // Create child from left und right parent
    cloned.chromosome.values.forEach((v, i) => {
      if (i >= cut) {
        cloned.chromosome.values[i] = rightParent.chromosome.values[i];
      }
    });

    return cloned;
  }

  // After hook called by genetic algorithm after each generation step
  afterEach(algorithm) {
    // Termination criteria
    if (algorithm.population.getBest().objective === 0) {
      algorithm.stop();
    }
  }

  // After hook called by genetic algorithm
  after(algorithm) {
    // Get best individual related to objective function
    const best = algorithm.population.getBest();

    // Equation result for best individual
    const result = this.equation(best.chromosome.values);

    // By default objective function is equal to fitness function
    console.log(`
      The best tuple (${best.chromosome.values}) found after ${algorithm.iterations} of maximal ${algorithm.generations} generations
      with a population size of ${algorithm.population.size} has a fitness value of ${best.fitness} 
      Then 4×${best.chromosome.values[0]}³-8×${best.chromosome.values[1]}²+7×${best.chromosome.values[2]}=${result} is the closest or exact result for this optimization
      
      >> Please feel free to play around with the example code <<
    `);
  }
}

const populationSize = 50;
const populationType = IntegerChromosome;
const populationIndividuals = [[6, 2, 4], [9, 1, 7], [5, 3, 8]];
const numberGenerations = 100;
const mutationProbability = 0.8;
const crossoverProbability = 0.4;
const randomSeed = 4711;

GeneticAlgorithm.run(
  Population.create(populationSize, populationType, populationIndividuals),
  CustomFunctions,
  numberGenerations,
  mutationProbability,
  crossoverProbability,
  randomSeed
);
