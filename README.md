JSEvolution
===========
> A JavaScript library for genetic algorithms

In computer science and operations research, a genetic algorithm (GA) is a metaheuristic inspired by the process of natural selection that belongs to the larger class of evolutionary algorithms (EA). Genetic algorithms are commonly used to generate high-quality solutions to optimization and search problems by relying on bio-inspired operators such as mutation, crossover and selection.
# Install
Install via npm with
```
npm install jsevolution
```
or via yarn with
```
yarn add jsevolution
```
# Usage

```javascript
import { IntegerChromosome, Population, DefaultFunctions, GeneticAlgorithm } from './jsevolution';

// Sets genetic algorithm parameters
const populationSize = 100;
const populationType = IntegerChromosome;
const populationIndividuals = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const numberGenerations = 500;
const mutationProbability = 0.5;
const crossoverProbability = 0.5;
const randomSeed = 58239;

// Override functions to optimize for your specific problem
// Check out example in the examples folder for more details
class CustomFunctions extends DefaultFunctions {
  // Before hook is called before genetic algorithm runs
  before() {
    // Your code here
  }
  
  // Before hook for each generation step
  beforeEach() {
    // Your code here
  }
  
  // Override with your fitness function
  fitness() {
    // Your code here
  }
  
  // Override this only if your objective
  // function differs from fitness function
  objective() {
    // Your code here
  }
  
  // Override with your mutation operator
  mutation() {
    // Your code here
  }
  
  // Override with your crossover operator
  crossover() {
    // Your code here
  }
  
  // After hook for each generation step
  afterEach() {
    // Your code here
  }
  
  // After hook is called after genetic algorithm ends
  after() {
    // Your code here
  }
}

// Runs genetic algorithm with defined parameters
GeneticAlgorithm.run(
  Population.create(populationSize, populationType, populationIndividuals),
  CustomFunctions,
  numberGenerations,
  mutationProbability,
  crossoverProbability,
  randomSeed
);
```
# Examples
> See examples folder

Run equation example via npm with
```
npm run equation
```
or via yarn with
```
yarn equation
```
> Runs a genetic algorithm to get closest result to zero for a cubic equation
