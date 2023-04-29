{
  abstract class Transformer {
    abstract transformNumber(number: Number): Expression;
    abstract transformBinaryOperation(
      binaryOperation: BinaryOperation
    ): Expression;
    abstract transformFunctionCall(functionalCall: FuntionalCall): Expression;
    abstract transformVariable(variable: Variable): Expression;
  }

  abstract class Expression {
    abstract evaluate(): number;
    abstract transform(tr: Transformer): Expression;
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
    transform(tr: Transformer): Expression {
      return tr.transformNumber(this);
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
    transform(tr: Transformer): Expression {
      return tr.transformBinaryOperation(this);
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
    transform(tr: Transformer): Expression {
      return tr.transformFunctionCall(this);
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
    transform(tr: Transformer): Expression {
      return tr.transformVariable(this);
    }
    private name_: string;
  }

  class CopySyntaxTree extends Transformer {
    transformNumber(number: Number): Expression {
      return new Number(number.value());
    }
    transformBinaryOperation(binaryOperation: BinaryOperation): Expression {
      return new BinaryOperation(
        binaryOperation.left().transform(this),
        binaryOperation.op(),
        binaryOperation.right().transform(this)
      );
    }
    transformFunctionCall(functionalCall: FuntionalCall): Expression {
      return new FuntionalCall(
        functionalCall.name(),
        functionalCall.arg().transform(this)
      );
    }
    transformVariable(variable: Variable): Expression {
      return new Variable(variable.name());
    }
  }

  let n32: Expression = new Number(32.0);
  let n16: Expression = new Number(16.0);
  let minus: BinaryOperation = new BinaryOperation(n32, Operations.MINUS, n16);
  let callSqrt: FuntionalCall = new FuntionalCall("sqrt", minus);
  let var1: Variable = new Variable("var");
  let mult: BinaryOperation = new BinaryOperation(
    var1,
    Operations.MUL,
    callSqrt
  );
  let callAbs: FuntionalCall = new FuntionalCall("abs", mult);

  let CST = new CopySyntaxTree();
  let newExpr = minus.transform(CST);
  console.log(newExpr.evaluate());
  console.log(minus.evaluate());
}
