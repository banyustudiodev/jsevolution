import { BitChromosome, Population, DefaultFunctions, GeneticAlgorithm } from './jsevolution';

test('GeneticAlgorithm population size is correct', () => {
  class Functions extends DefaultFunctions {
  }
  const algorithm = GeneticAlgorithm.run(Population.create(80, BitChromosome, [[]]), Functions, 5);
  expect(algorithm.population.size).toBe(80);
});

test('GeneticAlgorithm terminates normal', () => {
  class Functions extends DefaultFunctions {
  }
  const algorithm = GeneticAlgorithm.run(Population.create(5, BitChromosome, [[]]), Functions, 50);
  expect(algorithm.iterations).toBe(50);
});

test('GeneticAlgorithm stops earlier because of afterEach hook', () => {
  class Functions extends DefaultFunctions {
    afterEach(algorithm) {
      if (algorithm.iterations === 20) {
        algorithm.stop();
      }
      return this;
    }
  }
  const algorithm = GeneticAlgorithm.run(Population.create(5, BitChromosome, [[]]), Functions, 50);
  expect(algorithm.iterations).toBe(20);
});
