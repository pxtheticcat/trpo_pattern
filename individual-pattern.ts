export interface Strategy<T> {
  sort(array: T[]): T[];
}

export class StrategySelectionSort<T> implements Strategy<T> {
  sort(array: T[]): T[] {
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }
    }
    return array;
  }
}

export class StrategySelectionSortReverse<T> implements Strategy<T> {
  sort(array: T[]): T[] {
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] > array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }
    }
    return array;
  }
}

export class StrategyBubbleSort<T> implements Strategy<T> {
  sort(array: T[]): T[] {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }
}

export class Sorter<T> {
  constructor(strategy: Strategy<T>) {
    this.strategy = strategy;
  }
  setStrategy(strategy: Strategy<T>) {
    this.strategy = strategy;
  }
  sort(array: T[]): T[] {
    return this.strategy.sort(array);
  }
  private strategy: Strategy<T>;
}
