const calculator = require("../../models/calculator.js");

test("Somar = 4", () => {
  const result = calculator.sum(2, 2);
  expect(result).toBe(4);
});

test("Erro", () => {
  const result = calculator.sum(2, "2");
  expect(result).toBe("Erro");
});

test("Erro", () => {
  const result = calculator.sum("2", 2);
  expect(result).toBe("Erro");
});
