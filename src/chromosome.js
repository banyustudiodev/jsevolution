export class Chromosome {
  static create(values, min, max) {
    return new Chromosome(values, min, max);
  }
  constructor(values, min, max) {
    this.values = new Array(values.length);
    this.min = min;
    this.max = max;
    values.forEach((value, index) => {
      this.set(index, value);
    });
  }
  clone() {
    const cloned = Object.assign(Object.create(this), this);
    cloned.values = [...this.values];
    return cloned;
  }
  size() {
    return this.values.length;
  }
  set(index, value) {
    this.values[index] = value;
  }
  swap(leftIndex, rightIndex) {
    [this.values[leftIndex], this.values[rightIndex]] =
      [this.values[rightIndex], this.values[leftIndex]];
  }
  move(fromIndex, toIndex) {
    this.values.splice(toIndex, 0, ...this.values.splice(fromIndex, 1));
  }
}

export class IntegerChromosome extends Chromosome {
  static create(values, min, max) {
    return new IntegerChromosome(values, min, max);
  }
  constructor(values, min = -Infinity, max = Infinity) {
    super(values, min, max);
  }
  set(index, value) {
    if (value >= this.min && value <= this.max) {
      this.values[index] = value;
    } else {
      throw new TypeError();
    }
  }
}

export class BitChromosome extends IntegerChromosome {
  static create(values) {
    return new BitChromosome(values);
  }
  constructor(values) {
    super(values, 0, 1);
  }
}
