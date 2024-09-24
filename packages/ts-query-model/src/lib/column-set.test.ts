import { buildColumnSet } from "./column-set";
import { columns } from "./columns";

describe("buildColumnSet", () => {
  it("returns a column getter function", () => {
    const colFunc = buildColumnSet({
      test1: columns.string(),
      test2: columns.number(),
    });

    expect(typeof colFunc.get).toBe("function");
    expect(typeof colFunc.getAll).toBe("function");
  });

  describe("column getter function", () => {
    it("returns a columns object for the column name argument", () => {
      const cols = {
        test1: columns.string(),
        test2: columns.number(),
      };

      const colFunc = buildColumnSet(cols);

      expect(colFunc.get("test2")).toEqual({
        test2: cols["test2"],
      });
    });

    it("returns multiple column objects for multiple column name arguments", () => {
      const cols = {
        test1: columns.string(),
        test2: columns.number(),
      };

      const colFunc = buildColumnSet(cols);

      expect(colFunc.get("test2", "test1")).toEqual({
        test2: cols["test2"],
        test1: cols["test1"],
      });
    });

    it("getAll() returns all columns", () => {
      const cols = {
        test1: columns.string(),
        test2: columns.number(),
      };

      const colFunc = buildColumnSet(cols);

      expect(colFunc.getAll()).toEqual({
        test2: cols["test2"],
        test1: cols["test1"],
      });
    });
  });
});
