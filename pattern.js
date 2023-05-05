"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldConstants = exports.CopySyntaxTree = exports.Variable = exports.FuntionalCall = exports.BinaryOperation = exports.Operations = exports.Number_ = exports.Expression = exports.Transformer = void 0;
class Transformer {
}
exports.Transformer = Transformer;
class Expression {
}
exports.Expression = Expression;
class Number_ extends Expression {
    constructor(value) {
        super();
        this.value_ = value;
    }
    value() {
        return this.value_;
    }
    evaluate() {
        return this.value_;
    }
    transform(tr) {
        return tr.transformNumber(this);
    }
}
exports.Number_ = Number_;
var Operations;
(function (Operations) {
    Operations["PLUS"] = "+";
    Operations["MINUS"] = "-";
    Operations["DIV"] = "/";
    Operations["MUL"] = "*";
})(Operations = exports.Operations || (exports.Operations = {}));
class BinaryOperation extends Expression {
    constructor(left, op, right) {
        super();
        this.left_ = left;
        this.right_ = right;
        this.op_ = op;
    }
    left() {
        return this.left_;
    }
    right() {
        return this.right_;
    }
    op() {
        return this.op_;
    }
    evaluate() {
        let left = this.left_.evaluate();
        let right = this.right_.evaluate();
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
    transform(tr) {
        return tr.transformBinaryOperation(this);
    }
}
exports.BinaryOperation = BinaryOperation;
class FuntionalCall extends Expression {
    constructor(name, arg) {
        super();
        this.name_ = name;
        this.arg_ = arg;
    }
    name() {
        return this.name_;
    }
    arg() {
        return this.arg_;
    }
    evaluate() {
        if (this.name_ == "sqrt") {
            return Math.sqrt(this.arg_.evaluate());
        }
        else {
            return Math.abs(this.arg_.evaluate());
        }
        return 0;
    }
    transform(tr) {
        return tr.transformFunctionCall(this);
    }
}
exports.FuntionalCall = FuntionalCall;
class Variable extends Expression {
    constructor(name) {
        super();
        this.name_ = name;
    }
    name() {
        return this.name_;
    }
    evaluate() {
        return 0.0;
    }
    transform(tr) {
        return tr.transformVariable(this);
    }
}
exports.Variable = Variable;
class CopySyntaxTree extends Transformer {
    transformNumber(number) {
        return new Number_(number.value());
    }
    transformBinaryOperation(binaryOperation) {
        return new BinaryOperation(binaryOperation.left().transform(this), binaryOperation.op(), binaryOperation.right().transform(this));
    }
    transformFunctionCall(functionalCall) {
        return new FuntionalCall(functionalCall.name(), functionalCall.arg().transform(this));
    }
    transformVariable(variable) {
        return new Variable(variable.name());
    }
}
exports.CopySyntaxTree = CopySyntaxTree;
class FoldConstants extends Transformer {
    transformNumber(number) {
        return new Number_(number.value());
    }
    transformBinaryOperation(binaryOperation) {
        let newleft = binaryOperation.left().transform(this);
        let newright = binaryOperation.right().transform(this);
        let newbinaryOperation = new BinaryOperation(newleft, binaryOperation.op(), newright);
        if (newleft instanceof Number_ && newright instanceof Number_) {
            return new Number_(newbinaryOperation.evaluate());
        }
        return newbinaryOperation;
    }
    transformFunctionCall(functionalCall) {
        let newarg = functionalCall.arg().transform(this);
        let newfunctionalCall = new FuntionalCall(functionalCall.name(), newarg);
        if (newarg instanceof Number_) {
            return new Number_(newfunctionalCall.evaluate());
        }
        return newfunctionalCall;
    }
    transformVariable(variable) {
        return new Variable(variable.name());
    }
}
exports.FoldConstants = FoldConstants;
