{
  abstract class Expression {
    abstract evaluate(): number;
  }

  class Number extends Expression {
    constructor(value: number) {
      super();
      this.value_ = value;
    }
    value(): number {
      return this.value_;
    }
    evaluate(): number {
      return this.value_;
    }
    private value_: number;
  }

  enum Operations {
    PLUS = "+",
    MINUS = "-",
    DIV = "/",
    MUL = "*",
  }

  class BinaryOperation extends Expression {
    constructor(left: Expression, op: Operations, right: Expression) {
      super();

      this.left_ = left;
      this.right_ = right;
      this.op_ = op;
    }
    left(): Expression {
      return this.left_;
    }
    right(): Expression {
      return this.right_;
    }
    op(): Operations {
      return this.op_;
    }
    evaluate(): number {
      let left: number = this.left_.evaluate();
      let right: number = this.right_.evaluate();
      switch (this.op_) {
        case Operations.PLUS:
          return left + right;
          break;
        case Operations.MINUS:
          return left - right;
          break;
        case Operations.DIV:
          return left / right;
          break;
        case Operations.MUL:
          return left * right;
          break;
      }
      return 0;
    }
    private left_;
    private right_;
    private op_: Operations;
  }
  class FuntionalCall extends Expression {
    constructor(name: string, arg: Expression) {
      super();
      this.name_ = name;
      this.arg_ = arg;
    }
    name(): string {
      return this.name_;
    }
    arg(): Expression {
      return this.arg_;
    }
    evaluate(): number {
      if (this.name_ == "sqrt") {
        return Math.sqrt(this.arg_.evaluate());
      } else {
        return Math.abs(this.arg_.evaluate());
      }
      return 0;
    }
    private name_: string;
    private arg_: Expression;
  }

  class Variable extends Expression {
    constructor(name: string) {
      super();
      this.name_ = name;
    }
    name(): string {
      return this.name_;
    }
    evaluate(): number {
      return 0.0;
    }
    private name_: string;
  }

  let e1: Expression = new Number(1.234);
  let e2: Expression = new Number(-1.234);
  let e3: Expression = new BinaryOperation(e1, Operations.DIV, e2);
  console.log(e3.evaluate());
  let n32: Expression = new Number(32.0);
  let n16: Expression = new Number(16.0);
  let minus: Expression = new BinaryOperation(n32, Operations.MINUS, n16);
  let callSqrt = new FuntionalCall("sqrt", minus);
  let n2: Expression = new Number(2.0);
  let mult: Expression = new BinaryOperation(n2, Operations.MUL, callSqrt);
  let callAbs = new FuntionalCall("abs", mult);
  console.log(callAbs.evaluate());
}
