import { buildColumnSet } from "./column-set";
import { numberColumn, stringColumn } from "./columns";

describe("buildColumnSet", () => {
  it("returns a column getter function", () => {
    const colFunc = buildColumnSet({
      test1: stringColumn(),
      test2: numberColumn(),
    });

    expect(typeof colFunc.get).toBe("function");
    expect(typeof colFunc.getAll).toBe("function");
  });

  describe("column getter function", () => {
    it("returns a columns object for the column name argument", () => {
      const colFunc = buildColumnSet({
        test1: stringColumn(),
        test2: numberColumn(),
      });

      expect(colFunc.get("test2")).toEqual({
        columns: {
          test2: numberColumn(),
        },
      });
    });

    it("returns multiple column objects for multiple column name arguments", () => {
      const colFunc = buildColumnSet({
        test1: stringColumn(),
        test2: numberColumn(),
      });

      expect(colFunc.get("test2", "test1")).toEqual({
        columns: {
          test2: numberColumn(),
          test1: stringColumn(),
        },
      });
    });

    it("getAll() returns all columns", () => {
      const colFunc = buildColumnSet({
        test1: stringColumn(),
        test2: numberColumn(),
      });

      expect(colFunc.getAll()).toEqual({
        columns: {
          test2: numberColumn(),
          test1: stringColumn(),
        },
      });
    });
  });
});
