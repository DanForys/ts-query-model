import { ColumnOptions } from "../../types/query-model";

import {
  BooleanIntColumn,
  booleanIntColumn,
  booleanIntColumnNull,
  NullableBooleanIntColumn,
} from "./column-types/boolean-integer-column";
import {
  DateColumn,
  dateColumn,
  DateColumnNull,
  dateColumnNull,
} from "./column-types/date-column";
import {
  EnumColumn,
  enumColumn,
  EnumColumnNull,
  enumColumnNull,
} from "./column-types/enum-column";
import {
  JsonStringColumn,
  jsonStringColumn,
  JsonStringColumnNull,
  jsonStringColumnNull,
} from "./column-types/json-string-column";
import {
  NumberColumn,
  numberColumn,
  NumberColumnAutoIncrement,
  numberColumnAutoIncrement,
  NumberColumnNull,
  numberColumnNull,
} from "./column-types/number-like-column";
import {
  StringColumn,
  stringColumn,
  StringColumnNull,
  stringColumnNull,
} from "./column-types/string-like-column";

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
