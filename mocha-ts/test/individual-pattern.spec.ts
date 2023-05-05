import { assert } from "chai";
import {
  Strategy,
  StrategySelectionSort,
  StrategyBubbleSort,
  Sorter,
  StrategySelectionSortReverse,
} from "../../individual-pattern";

describe("Тестирование реализованных стратегий сортировки", () => {
  const sorter = new Sorter(new StrategySelectionSort());
  const stringArr: string[] = [
    "j",
    "z",
    "y",
    "w",
    "v",
    "x",
    "c",
    "f",
    "u",
    "g",
    "m",
    "l",
    "b",
    "d",
    "e",
    "q",
    "t",
    "i",
    "h",
    "s",
    "r",
    "p",
    "k",
    "o",
    "n",
    "a",
  ];
  const stringArrSorted: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const stringArrSortedReverse: string[] = [
    "z",
    "y",
    "x",
    "w",
    "v",
    "u",
    "t",
    "s",
    "r",
    "q",
    "p",
    "o",
    "n",
    "m",
    "l",
    "k",
    "j",
    "i",
    "h",
    "g",
    "f",
    "e",
    "d",
    "c",
    "b",
    "a",
  ];
  const numberArr: number[] = [9, 4, 1, 2, 8, 3, 6, 7, 5];
  const numberArrSorted: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numberArrSortedReverse: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  describe("Стратегия сортировки выборкой StrategySelectionSort()", () => {
    it("Массив string[]", () => {
      sorter.setStrategy(new StrategySelectionSort());
      assert.deepStrictEqual(sorter.sort(stringArr), stringArrSorted);
    });
    it("Массив number[]", () => {
      sorter.setStrategy(new StrategySelectionSort());
      assert.deepStrictEqual(sorter.sort(numberArr), numberArrSorted);
    });
  });
  describe("Стратегия сортировки выборкой по убыванию StrategySelectionSortReverse()", () => {
    it("Массив string[]", () => {
      sorter.setStrategy(new StrategySelectionSortReverse());
      assert.deepStrictEqual(sorter.sort(stringArr), stringArrSortedReverse);
    });
    it("Массив number[]", () => {
      sorter.setStrategy(new StrategySelectionSortReverse());
      assert.deepStrictEqual(sorter.sort(numberArr), numberArrSortedReverse);
    });
  });
  describe("Стратегия сортировки пузырьком StrategyBubbleSort()", () => {
    it("Массив string[]", () => {
      sorter.setStrategy(new StrategyBubbleSort());
      assert.deepStrictEqual(sorter.sort(stringArr), stringArrSorted);
    });
    it("Массив number[]", () => {
      sorter.setStrategy(new StrategyBubbleSort());
      assert.deepStrictEqual(sorter.sort(numberArr), numberArrSorted);
    });
  });
});
