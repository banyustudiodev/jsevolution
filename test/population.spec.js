import { BitChromosome, Individual, Population } from './jsevolution';

test('Individual clone is not identical', () => {
  const individual = Individual.create(BitChromosome, [1, 1, 1, 1]);
  expect(individual).not.toBe(individual.clone());
});

test('Individual clone is equal', () => {
  const individual = Individual.create(BitChromosome, [1, 1, 1, 1]);
  expect(individual).toEqual(individual.clone());
});

test('Population get best individual by objective', () => {
  const population = Population.create(3, BitChromosome, []);
  population.add(Individual.create(BitChromosome, [0, 0, 0, 0], 5, 2));
  population.add(Individual.create(BitChromosome, [0, 1, 1, 0], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 0, 1], 3, 4));
  expect(population.getBest().chromosome.values).toEqual([0, 0, 0, 0]);
});

test('Population remove worst individuals by fitness', () => {
  const population = Population.create(5, BitChromosome, []);
  population.add(Individual.create(BitChromosome, [0, 0, 0, 0], 5, 2));
  population.add(Individual.create(BitChromosome, [0, 1, 1, 0], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 0, 1], 3, 4));
  population.add(Individual.create(BitChromosome, [0, 1, 0, 1], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 1, 0], 1, 4));
  population.removeWorstFittest(3);
  expect(population.individuals.length).toBe(2);
  expect(population.getBest().chromosome.values).toEqual([0, 0, 0, 0]);
});

test('Population contains at least two individuals', () => {
  const population = Population.create(3, BitChromosome, []);
  population.add(Individual.create(BitChromosome, [0, 0, 0, 0], 5, 2));
  population.add(Individual.create(BitChromosome, [0, 1, 1, 0], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 0, 1], 3, 4));
  population.removeWorstFittest(3);
  expect(population.individuals.length).toBe(2);
});

test('Population add more individuals than size', () => {
  const population = Population.create(4, BitChromosome, []);
  population.add(Individual.create(BitChromosome, [0, 0, 0, 0], 5, 2));
  population.add(Individual.create(BitChromosome, [0, 1, 1, 0], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 0, 1], 3, 4));
  population.add(Individual.create(BitChromosome, [0, 1, 0, 1], 2, 3));
  population.add(Individual.create(BitChromosome, [1, 0, 1, 0], 1, 4));
  expect(population.individuals.length).toBe(population.size);
});
