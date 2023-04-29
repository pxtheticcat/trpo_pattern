var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
{
    var Transformer = /** @class */ (function () {
        function Transformer() {
        }
        return Transformer;
    }());
    var Expression = /** @class */ (function () {
        function Expression() {
        }
        return Expression;
    }());
    var Number_1 = /** @class */ (function (_super) {
        __extends(Number, _super);
        function Number(value) {
            var _this = _super.call(this) || this;
            _this.value_ = value;
            return _this;
        }
        Number.prototype.value = function () {
            return this.value_;
        };
        Number.prototype.evaluate = function () {
            return this.value_;
        };
        Number.prototype.transform = function (tr) {
            return tr.transformNumber(this);
        };
        return Number;
    }(Expression));
    var Operations = void 0;
    (function (Operations) {
        Operations["PLUS"] = "+";
        Operations["MINUS"] = "-";
        Operations["DIV"] = "/";
        Operations["MUL"] = "*";
    })(Operations || (Operations = {}));
    var BinaryOperation_1 = /** @class */ (function (_super) {
        __extends(BinaryOperation, _super);
        function BinaryOperation(left, op, right) {
            var _this = _super.call(this) || this;
            _this.left_ = left;
            _this.right_ = right;
            _this.op_ = op;
            return _this;
        }
        BinaryOperation.prototype.left = function () {
            return this.left_;
        };
        BinaryOperation.prototype.right = function () {
            return this.right_;
        };
        BinaryOperation.prototype.op = function () {
            return this.op_;
        };
        BinaryOperation.prototype.evaluate = function () {
            var left = this.left_.evaluate();
            var right = this.right_.evaluate();
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
        };
        BinaryOperation.prototype.transform = function (tr) {
            return tr.transformBinaryOperation(this);
        };
        return BinaryOperation;
    }(Expression));
    var FuntionalCall_1 = /** @class */ (function (_super) {
        __extends(FuntionalCall, _super);
        function FuntionalCall(name, arg) {
            var _this = _super.call(this) || this;
            _this.name_ = name;
            _this.arg_ = arg;
            return _this;
        }
        FuntionalCall.prototype.name = function () {
            return this.name_;
        };
        FuntionalCall.prototype.arg = function () {
            return this.arg_;
        };
        FuntionalCall.prototype.evaluate = function () {
            if (this.name_ == "sqrt") {
                return Math.sqrt(this.arg_.evaluate());
            }
            else {
                return Math.abs(this.arg_.evaluate());
            }
            return 0;
        };
        FuntionalCall.prototype.transform = function (tr) {
            return tr.transformFunctionCall(this);
        };
        return FuntionalCall;
    }(Expression));
    var Variable_1 = /** @class */ (function (_super) {
        __extends(Variable, _super);
        function Variable(name) {
            var _this = _super.call(this) || this;
            _this.name_ = name;
            return _this;
        }
        Variable.prototype.name = function () {
            return this.name_;
        };
        Variable.prototype.evaluate = function () {
            return 0.0;
        };
        Variable.prototype.transform = function (tr) {
            return tr.transformVariable(this);
        };
        return Variable;
    }(Expression));
    var CopySyntaxTree = /** @class */ (function (_super) {
        __extends(CopySyntaxTree, _super);
        function CopySyntaxTree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CopySyntaxTree.prototype.transformNumber = function (number) {
            return new Number_1(number.value());
        };
        CopySyntaxTree.prototype.transformBinaryOperation = function (binaryOperation) {
            return new BinaryOperation_1(binaryOperation.left().transform(this), binaryOperation.op(), binaryOperation.right().transform(this));
        };
        CopySyntaxTree.prototype.transformFunctionCall = function (functionalCall) {
            return new FuntionalCall_1(functionalCall.name(), functionalCall.arg().transform(this));
        };
        CopySyntaxTree.prototype.transformVariable = function (variable) {
            return new Variable_1(variable.name());
        };
        return CopySyntaxTree;
    }(Transformer));
    var FoldConstants = /** @class */ (function (_super) {
        __extends(FoldConstants, _super);
        function FoldConstants() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FoldConstants.prototype.transformNumber = function (number) {
            return new Number_1(number.value());
        };
        FoldConstants.prototype.transformBinaryOperation = function (binaryOperation) {
            var newleft = binaryOperation.left().transform(this);
            var newright = binaryOperation.right().transform(this);
            var newbinaryOperation = new BinaryOperation_1(newleft, binaryOperation.op(), newright);
            if (newleft instanceof Number_1 && newright instanceof Number_1) {
                return new Number_1(newbinaryOperation.evaluate());
            }
            return newbinaryOperation;
        };
        FoldConstants.prototype.transformFunctionCall = function (functionalCall) {
            var newarg = functionalCall.arg().transform(this);
            var newfunctionalCall = new FuntionalCall_1(functionalCall.name(), newarg);
            if (newarg instanceof Number_1) {
                return new Number_1(newfunctionalCall.evaluate());
            }
            return newfunctionalCall;
        };
        FoldConstants.prototype.transformVariable = function (variable) {
            return new Variable_1(variable.name());
        };
        return FoldConstants;
    }(Transformer));
    var n32 = new Number_1(32.0);
    var n16 = new Number_1(16.0);
    var minus = new BinaryOperation_1(n32, Operations.MINUS, n16);
    var callSqrt = new FuntionalCall_1("sqrt", minus);
    var var1 = new Variable_1("var");
    var mult = new BinaryOperation_1(var1, Operations.MUL, callSqrt);
    var callAbs = new FuntionalCall_1("abs", mult);
    var FC = new FoldConstants();
    var newExpr = callAbs.transform(FC);
    console.log(callAbs);
    console.log(newExpr);
}
