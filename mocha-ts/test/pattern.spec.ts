import { assert } from "chai";
import {
  Expression,
  Number_,
  BinaryOperation,
  FuntionalCall,
  Variable,
  Operations,
} from "../../pattern";

describe("Тестирование иерархии классов Expression", () => {
  describe("Класс Number", () => {
    it("Конструктор класса Number", () => {
      assert.instanceOf(new Number_(1.0), Number_);
    });
    it("Метод value()", () => {
      assert.equal(new Number_(-16.0).value(), -16);
    });
    it("Метод evaluate()", () => {
      assert.equal(new Number_(32.0).evaluate(), 32);
    });
  });

  describe("Класс BinaryOperation", () => {
    it("Конструктор класса BinaryOperation", () => {
      assert.instanceOf(
        new BinaryOperation(
          new Number_(8.0),
          Operations.PLUS,
          new Number_(8.0)
        ),
        BinaryOperation
      );
    });
    it("Метод left()", () => {
      const left: Number_ = new Number_(16.0);
      const right: Number_ = new Number_(8.0);
      assert.equal(
        new BinaryOperation(left, Operations.PLUS, right).left(),
        left
      );
    });
    it("Метод right()", () => {
      const left: Number_ = new Number_(16.0);
      const right: Number_ = new Number_(8.0);
      assert.equal(
        new BinaryOperation(left, Operations.PLUS, right).right(),
        right
      );
    });
    it("Метод op()", () => {
      const left: Number_ = new Number_(16.0);
      const right: Number_ = new Number_(8.0);
      const op: Operations = Operations.PLUS;
      assert.equal(new BinaryOperation(left, op, right).op(), op);
    });
    describe("Метод evaluate()", () => {
      it("Операция PLUS", () => {
        const left: Number_ = new Number_(16.0);
        const right: Number_ = new Number_(8.0);
        const res: number = left.evaluate() + right.evaluate();
        assert.equal(
          new BinaryOperation(left, Operations.PLUS, right).evaluate(),
          res
        );
      });
      it("Операция MINUS", () => {
        const left: Number_ = new Number_(16.0);
        const right: Number_ = new Number_(8.0);
        const res: number = left.evaluate() - right.evaluate();
        assert.equal(
          new BinaryOperation(left, Operations.MINUS, right).evaluate(),
          res
        );
      });
      it("Операция DIV", () => {
        const left: Number_ = new Number_(16.0);
        const right: Number_ = new Number_(8.0);
        const res: number = left.evaluate() / right.evaluate();
        assert.equal(
          new BinaryOperation(left, Operations.DIV, right).evaluate(),
          res
        );
      });
      it("Операция MUL", () => {
        const left: Number_ = new Number_(16.0);
        const right: Number_ = new Number_(8.0);
        const res: number = left.evaluate() * right.evaluate();
        assert.equal(
          new BinaryOperation(left, Operations.MUL, right).evaluate(),
          res
        );
      });
    });
  });

  describe("Класс FunctionalCall", () => {
    it("Конструктор класса FunctionalCall", () => {
      assert.instanceOf(
        new FuntionalCall("abs", new Number_(16.0)),
        FuntionalCall
      );
    });
    it("Метод name()", () => {
      assert.equal(new FuntionalCall("abs", new Number_(16.0)).name(), "abs");
    });
    it("Метод arg()", () => {
      const arg: Number_ = new Number_(16.0);
      assert.equal(new FuntionalCall("abs", arg).arg(), arg);
    });
    describe("Метод evaluate()", () => {
      it("Операция 'abs'", () => {
        assert.equal(
          new FuntionalCall("abs", new Number_(-16.0)).evaluate(),
          16
        );
      });
      it("Операция 'sqrt'", () => {
        assert.equal(
          new FuntionalCall("sqrt", new Number_(16.0)).evaluate(),
          4
        );
      });
      it("Операция 'sqrt' от отрицательного числа", () => {
        assert.isNaN(new FuntionalCall("sqrt", new Number_(-16.0)).evaluate());
      });
    });
  });
  describe("Класс Variable", () => {
    it("Конструктор класса Variable", () => {
      assert.instanceOf(new Variable("name"), Variable);
    });
    it("Метод name()", () => {
      assert.equal(new Variable("name").name(), "name");
    });
    it("Метод evaluate()", () => {
      assert.equal(new Variable("name").evaluate(), 0);
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
