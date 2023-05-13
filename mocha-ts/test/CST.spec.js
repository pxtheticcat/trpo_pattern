"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const pattern_1 = require("../../pattern");
describe("Класс CopySyntaxTree", () => {
    describe("Копирование объекта класса Number", () => {
        const num1 = new pattern_1.Number_(16.0);
        const CST = new pattern_1.CopySyntaxTree();
        const ne
    });
    describe("Копирование объекта класса BinaryOperation", () => {
        const num1 = new pattern_1.Number_(16.0);
        const num2 = new pattern_1.Number_(8.0);
        const minus = new pattern_1.BinaryOperation(num1, pattern_1.Operations.MINUS, num2);
        const CST = new pattern_1.CopySyntaxTree();
        const newExpr = minus.transform(CST);
        it("Исходный объект и новый объект являются различными объектами", () => {
            chai_1.assert.notEqual(minus, newExpr);
        });
        it("Исходный объект и новый объект имеют идентичные AST представления", () => {
            chai_1.assert.deepStrictEqual(minus, newExpr);
        });
    });
    describe("Копирование объекта класса FunctionalCall", () => {
        const num1 = new pattern_1.Number_(16.0);
        const callSqrt = new pattern_1.FuntionalCall("sqrt", num1);
        const CST = new pattern_1.CopySyntaxTree();
        const newExpr = callSqrt.transform(CST);
        it("Исходный объект и новый объект являются различными объектами", () => {
            chai_1.assert.notEqual(callSqrt, newExpr);
        });
        it("Исходный объект и новый объект имеют идентичные AST представления", () => {
            chai_1.assert.deepStrictEqual(callSqrt, newExpr);
        });
    });
    describe("Копирование объекта класса Variable", () => {
        const var1 = new pattern_1.Variable("name");
        const CST = new pattern_1.CopySyntaxTree();
        const newExpr = var1.transform(CST);
        it("Исходный объект и новый объект являются различными объектами", () => {
            chai_1.assert.notEqual(var1, newExpr);
        });
        it("Исходный объект и новый объект имеют идентичные AST представления", () => {
            chai_1.assert.deepStrictEqual(var1, newExpr);
        });
    });
});
