import { assert } from "chai";
import {
  Expression,
  Number_,
  BinaryOperation,
  FuntionalCall,
  Variable,
  Operations,
  CopySyntaxTree,
} from "../../pattern";

describe("Класс CopySyntaxTree", () => {
  describe("Копирование объекта класса Number", () => {
    const num1: Number_ = new Number_(16.0);
    const CST: CopySyntaxTree = new CopySyntaxTree();
    const newExpr = num1.transform(CST);
    it("Исходный объект и новый объект являются различными объектами", () => {
      assert.notEqual(num1, newExpr);
    });
    it("Исходный объект и новый объект имеют идентичные AST представления", () => {
      assert.deepStrictEqual(num1, newExpr);
    });
  });

  describe("Копирование объекта класса BinaryOperation", () => {
    const num1: Number_ = new Number_(16.0);
    const num2: Number_ = new Number_(8.0);
    const minus: BinaryOperation = new BinaryOperation(
      num1,
      Operations.MINUS,
      num2
    );
    const CST: CopySyntaxTree = new CopySyntaxTree();
    const newExpr = minus.transform(CST);
    it("Исходный объект и новый объект являются различными объектами", () => {
      assert.notEqual(minus, newExpr);
    });
    it("Исходный объект и новый объект имеют идентичные AST представления", () => {
      assert.deepStrictEqual(minus, newExpr);
    });
  });

  describe("Копирование объекта класса FunctionalCall", () => {
    const num1: Number_ = new Number_(16.0);
    const callSqrt: FuntionalCall = new FuntionalCall("sqrt", num1);
    const CST: CopySyntaxTree = new CopySyntaxTree();
    const newExpr = callSqrt.transform(CST);
    it("Исходный объект и новый объект являются различными объектами", () => {
      assert.notEqual(callSqrt, newExpr);
    });
    it("Исходный объект и новый объект имеют идентичные AST представления", () => {
      assert.deepStrictEqual(callSqrt, newExpr);
    });
  });

  describe("Копирование объекта класса Variable", () => {
    const var1: Variable = new Variable("name");
    const CST: CopySyntaxTree = new CopySyntaxTree();
    const newExpr = var1.transform(CST);
    it("Исходный объект и новый объект являются различными объектами", () => {
      assert.notEqual(var1, newExpr);
    });
    it("Исходный объект и новый объект имеют идентичные AST представления", () => {
      assert.deepStrictEqual(var1, newExpr);
    });
  });
});
