import { assert } from "chai";
import {
  Expression,
  Number_,
  BinaryOperation,
  FuntionalCall,
  Variable,
  Operations,
  FoldConstants,
} from "../../pattern";

describe("Класс FoldConstants", () => {
  it("Сворачивание констант для объекта типа Number", () => {
    const num1: Number_ = new Number_(16.0);
    const FC: FoldConstants = new FoldConstants();
    const newExpr = num1.transform(FC);
    assert.deepStrictEqual(num1, newExpr);
  });
  it("Сворачивание констант для объекта типа BinaryOperation", () => {
    const num1: Number_ = new Number_(64.0);
    const callSqrt: FuntionalCall = new FuntionalCall("sqrt", num1);
    const var1: Variable = new Variable("var");
    const plus: BinaryOperation = new BinaryOperation(
      callSqrt,
      Operations.PLUS,
      var1
    );

    const FC: FoldConstants = new FoldConstants();
    const newExpr = plus.transform(FC);

    const res = new BinaryOperation(
      new Number_(8.0),
      Operations.PLUS,
      new Variable("var")
    );

    assert.deepStrictEqual(newExpr, res);
  });
  it("Сворачивание констант для объекта типа FunctionalCall", () => {
    const num1: Number_ = new Number_(32.0);
    const num2: Number_ = new Number_(16.0);
    const minus: BinaryOperation = new BinaryOperation(
      num1,
      Operations.MINUS,
      num2
    );
    const callSqrt: FuntionalCall = new FuntionalCall("sqrt", minus);
    const var1: Variable = new Variable("var");
    const mult: BinaryOperation = new BinaryOperation(
      var1,
      Operations.MUL,
      callSqrt
    );
    const callAbs: FuntionalCall = new FuntionalCall("abs", mult);

    const FC: FoldConstants = new FoldConstants();
    const newExpr = callAbs.transform(FC);

    const res = new FuntionalCall(
      "abs",
      new BinaryOperation(new Variable("var"), Operations.MUL, new Number_(4.0))
    );

    assert.deepStrictEqual(newExpr, res);
  });
});
