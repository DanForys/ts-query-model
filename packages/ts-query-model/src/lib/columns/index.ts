import {
  booleanIntColumn,
  booleanIntColumnNull,
} from "./column-types/boolean-integer-column";
import { dateColumn, dateColumnNull } from "./column-types/date-column";
import { enumColumn, enumColumnNull } from "./column-types/enum-column";
import {
  jsonStringColumn,
  jsonStringColumnNull,
} from "./column-types/json-string-column";
import {
  numberColumn,
  numberColumnAutoIncrement,
  numberColumnNull,
} from "./column-types/number-like-column";
import {
  stringColumn,
  stringColumnNull,
} from "./column-types/string-like-column";

// export default {
//   booleanIntColumn as booleanInt,
//   booleanIntColumnNull as booleanIntNull,
//   dateColumn as date,
//   dateColumnNull as dateNull,
//   enumColumn as enum,
//   enumColumnNull as enumNull,
//   jsonStringColumn as jsonString,
//   jsonStringColumnNull as jsonStringNull,
//   numberColumn as number,
//   numberColumnAutoIncrement as numberAutoIncrement,
//   numberColumnNull as numberNull,
//   stringColumn as string,
//   stringColumnNull as stringNull,
// };

export default {
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
