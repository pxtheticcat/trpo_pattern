"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = exports.StrategyBubbleSort = exports.StrategySelectionSortReverse = exports.StrategySelectionSort = void 0;
class StrategySelectionSort {
    sort(array) {
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
exports.StrategySelectionSort = StrategySelectionSort;
class StrategySelectionSortReverse {
    sort(array) {
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
exports.StrategySelectionSortReverse = StrategySelectionSortReverse;
class StrategyBubbleSort {
    sort(array) {
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
exports.StrategyBubbleSort = StrategyBubbleSort;
class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(array) {
        return this.strategy.sort(array);
    }
}
exports.Sorter = Sorter;
