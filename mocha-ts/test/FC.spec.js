"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const pattern_1 = require("../../pattern");
describe("Класс FoldConstants", () => {
    it("Сворачивание констант для объекта типа Number", () => {
        const num1 = new pattern_1.Number_(16.0);
        const FC = new pattern_1.FoldConstants();
        const newExpr = num1.transform(FC);
        chai_1.assert.deepStrictEqual(num1, newExpr);
    });
    it("Сворачивание констант для объекта типа BinaryOperation", () => {
        const num1 = new pattern_1.Number_(64.0);
        const callSqrt = new pattern_1.FuntionalCall("sqrt", num1);
        const var1 = new pattern_1.Variable("var");
        const plus = new pattern_1.BinaryOperation(callSqrt, pattern_1.Operations.PLUS, var1);
        const FC = new pattern_1.FoldConstants();
        const newExpr = plus.transform(FC);
        const res = new pattern_1.BinaryOperation(new pattern_1.Number_(8.0), pattern_1.Operations.PLUS, new pattern_1.Variable("var"));
        chai_1.assert.deepStrictEqual(newExpr, res);
    });
    it("Сворачивание констант для объекта типа FunctionalCall", () => {
        const num1 = new pattern_1.Number_(32.0);
        const num2 = new pattern_1.Number_(16.0);
        const minus = new pattern_1.BinaryOperation(num1, pattern_1.Operations.MINUS, num2);
        const callSqrt = new pattern_1.FuntionalCall("sqrt", minus);
        const var1 = new pattern_1.Variable("var");
        const mult = new pattern_1.BinaryOperation(var1, pattern_1.Operations.MUL, callSqrt);
        const callAbs = new pattern_1.FuntionalCall("abs", mult);
        const FC = new pattern_1.FoldConstants();
        const newExpr = callAbs.transform(FC);
        const res = new pattern_1.FuntionalCall("abs", new pattern_1.BinaryOperation(new pattern_1.Variable("var"), pattern_1.Operations.MUL, new pattern_1.Number_(4.0)));
        chai_1.assert.deepStrictEqual(newExpr, res);
    });
});
