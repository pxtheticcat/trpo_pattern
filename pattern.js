var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
{
  var Expression = /** @class */ (function () {
    function Expression() {}
    return Expression;
  })();
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
    return Number;
  })(Expression);
  var Operations = void 0;
  (function (Operations) {
    Operations["PLUS"] = "+";
    Operations["MINUS"] = "-";
    Operations["DIV"] = "/";
    Operations["MUL"] = "*";
  })(Operations || (Operations = {}));
  var BinaryOperation = /** @class */ (function (_super) {
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
    return BinaryOperation;
  })(Expression);
  var FuntionalCall = /** @class */ (function (_super) {
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
      } else {
        return Math.abs(this.arg_.evaluate());
      }
      return 0;
    };
    return FuntionalCall;
  })(Expression);
  var Variable = /** @class */ (function (_super) {
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
    return Variable;
  })(Expression);
  var e1 = new Number_1(1.234);
  var e2 = new Number_1(-1.234);
  var e3 = new BinaryOperation(e1, Operations.DIV, e2);
  console.log(e3.evaluate());
  var n32 = new Number_1(32.0);
  var n16 = new Number_1(16.0);
  var minus = new BinaryOperation(n32, Operations.MINUS, n16);
  var callSqrt = new FuntionalCall("sqrt", minus);
  var n2 = new Number_1(2.0);
  var mult = new BinaryOperation(n2, Operations.MUL, callSqrt);
  var callAbs = new FuntionalCall("abs", mult);
  console.log(callAbs.evaluate());
}
