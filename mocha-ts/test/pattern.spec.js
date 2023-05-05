"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const pattern_1 = require("../../pattern");
describe("Тестирование иерархии классов Expression", () => {
    describe("Класс Number", () => {
        it("Конструктор класса Number", () => {
            chai_1.assert.instanceOf(new pattern_1.Number_(1.0), pattern_1.Number_);
        });
        it("Метод value()", () => {
            chai_1.assert.equal(new pattern_1.Number_(-16.0).value(), -16);
        });
        it("Метод evaluate()", () => {
            chai_1.assert.equal(new pattern_1.Number_(32.0).evaluate(), 32);
        });
    });
    describe("Класс BinaryOperation", () => {
        it("Конструктор класса BinaryOperation", () => {
            chai_1.assert.instanceOf(new pattern_1.BinaryOperation(new pattern_1.Number_(8.0), pattern_1.Operations.PLUS, new pattern_1.Number_(8.0)), pattern_1.BinaryOperation);
        });
        it("Метод left()", () => {
            const left = new pattern_1.Number_(16.0);
            const right = new pattern_1.Number_(8.0);
            chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.PLUS, right).left(), left);
        });
        it("Метод right()", () => {
            const left = new pattern_1.Number_(16.0);
            const right = new pattern_1.Number_(8.0);
            chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.PLUS, right).right(), right);
        });
        it("Метод op()", () => {
            const left = new pattern_1.Number_(16.0);
            const right = new pattern_1.Number_(8.0);
            const op = pattern_1.Operations.PLUS;
            chai_1.assert.equal(new pattern_1.BinaryOperation(left, op, right).op(), op);
        });
        describe("Метод evaluate()", () => {
            it("Операция PLUS", () => {
                const left = new pattern_1.Number_(16.0);
                const right = new pattern_1.Number_(8.0);
                const res = left.evaluate() + right.evaluate();
                chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.PLUS, right).evaluate(), res);
            });
            it("Операция MINUS", () => {
                const left = new pattern_1.Number_(16.0);
                const right = new pattern_1.Number_(8.0);
                const res = left.evaluate() - right.evaluate();
                chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.MINUS, right).evaluate(), res);
            });
            it("Операция DIV", () => {
                const left = new pattern_1.Number_(16.0);
                const right = new pattern_1.Number_(8.0);
                const res = left.evaluate() / right.evaluate();
                chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.DIV, right).evaluate(), res);
            });
            it("Операция MUL", () => {
                const left = new pattern_1.Number_(16.0);
                const right = new pattern_1.Number_(8.0);
                const res = left.evaluate() * right.evaluate();
                chai_1.assert.equal(new pattern_1.BinaryOperation(left, pattern_1.Operations.MUL, right).evaluate(), res);
            });
        });
    });
    describe("Класс FunctionalCall", () => {
        it("Конструктор класса FunctionalCall", () => {
            chai_1.assert.instanceOf(new pattern_1.FuntionalCall("abs", new pattern_1.Number_(16.0)), pattern_1.FuntionalCall);
        });
        it("Метод name()", () => {
            chai_1.assert.equal(new pattern_1.FuntionalCall("abs", new pattern_1.Number_(16.0)).name(), "abs");
        });
        it("Метод arg()", () => {
            const arg = new pattern_1.Number_(16.0);
            chai_1.assert.equal(new pattern_1.FuntionalCall("abs", arg).arg(), arg);
        });
        describe("Метод evaluate()", () => {
            it("Операция 'abs'", () => {
                chai_1.assert.equal(new pattern_1.FuntionalCall("abs", new pattern_1.Number_(-16.0)).evaluate(), 16);
            });
            it("Операция 'sqrt'", () => {
                chai_1.assert.equal(new pattern_1.FuntionalCall("sqrt", new pattern_1.Number_(16.0)).evaluate(), 4);
            });
            it("Операция 'sqrt' от отрицательного числа", () => {
                chai_1.assert.isNaN(new pattern_1.FuntionalCall("sqrt", new pattern_1.Number_(-16.0)).evaluate());
            });
        });
    });
    describe("Класс Variable", () => {
        it("Конструктор класса Variable", () => {
            chai_1.assert.instanceOf(new pattern_1.Variable("name"), pattern_1.Variable);
        });
        it("Метод name()", () => {
            chai_1.assert.equal(new pattern_1.Variable("name").name(), "name");
        });
        it("Метод evaluate()", () => {
            chai_1.assert.equal(new pattern_1.Variable("name").evaluate(), 0);
        });
    });
});
// describe("Тестирование класса BinaryOperation", () => {
//   for (let i = 1; i < 1000; i++) {
//     let a: Expression = new Number_(Math.floor(Math.random() * 100000));
//     let b: Expression = new Number_(Math.floor(Math.random() * 100000));
//     let expected_result: number;
//     let op = Math.floor(Math.random() * 4);
//     switch (op) {
//       case 0:
//         expected_result = a.evaluate() + b.evaluate();
//         it(`Сложение ${a.evaluate()} и ${b.evaluate()}`, () => {
//           const result = new BinaryOperation(a, Operations.PLUS, b).evaluate();
//           assert.equal(result, expected_result);
//         });
//         break;
//       case 1:
//         expected_result = a.evaluate() - b.evaluate();
//         it(`Вычитание ${b.evaluate()} из ${a.evaluate()}`, () => {
//           const result = new BinaryOperation(a, Operations.MINUS, b).evaluate();
//           assert.equal(result, expected_result);
//         });
//         break;
//       case 2:
//         expected_result = a.evaluate() / b.evaluate();
//         it(`Деление ${a.evaluate()} на ${b.evaluate()}`, () => {
//           const result = new BinaryOperation(a, Operations.DIV, b).evaluate();
//           assert.equal(result, expected_result);
//         });
//         break;
//       case 3:
//         expected_result = a.evaluate() * b.evaluate();
//         it(`Умножение ${b.evaluate()} на ${a.evaluate()}`, () => {
//           const result = new BinaryOperation(a, Operations.MUL, b).evaluate();
//           assert.equal(result, expected_result);
//         });
//         break;
//     }
//   }
// });
