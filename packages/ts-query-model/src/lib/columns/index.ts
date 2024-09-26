import { ColumnOptions } from "../../types/query-model.js";

import {
  BooleanIntColumn,
  booleanIntColumn,
  booleanIntColumnNull,
  NullableBooleanIntColumn,
} from "./column-types/boolean-integer-column.js";
import {
  DateColumn,
  dateColumn,
  DateColumnNull,
  dateColumnNull,
} from "./column-types/date-column.js";
import {
  EnumColumn,
  enumColumn,
  EnumColumnNull,
  enumColumnNull,
} from "./column-types/enum-column.js";
import {
  JsonStringColumn,
  jsonStringColumn,
  JsonStringColumnNull,
  jsonStringColumnNull,
} from "./column-types/json-string-column.js";
import {
  NumberColumn,
  numberColumn,
  NumberColumnAutoIncrement,
  numberColumnAutoIncrement,
  NumberColumnNull,
  numberColumnNull,
} from "./column-types/number-like-column.js";
import {
  StringColumn,
  stringColumn,
  StringColumnNull,
  stringColumnNull,
} from "./column-types/string-like-column.js";

const columns = {
  booleanInt: booleanIntColumn,
  booleanIntNull: booleanIntColumnNull,
  date: dateColumn,
  dateNull: dateColumnNull,
  enum: enumColumn,
  enumNull: enumColumnNull,
  jsonString: jsonStringColumn,
  jsonStringNull: jsonStringColumnNull,
  number: numberColumn,
  numberAutoIncrement: numberColumnAutoIncrement,
  numberNull: numberColumnNull,
  string: stringColumn,
  stringNull: stringColumnNull,
};

export {
  BooleanIntColumn,
  ColumnOptions,
  columns,
  DateColumn,
  DateColumnNull,
  EnumColumn,
  EnumColumnNull,
  JsonStringColumn,
  JsonStringColumnNull,
  NullableBooleanIntColumn,
  NumberColumn,
  NumberColumnAutoIncrement,
  NumberColumnNull,
  StringColumn,
  StringColumnNull,
};
