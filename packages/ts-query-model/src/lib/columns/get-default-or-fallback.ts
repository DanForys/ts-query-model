import { ColumnDefault } from "../../types/query-model";

// type DefaultValue<T extends ColumnDefault<any>, V> = T extends () => any
//   ? () => ReturnType<T>
//   : T extends undefined
//   ? V
//   : T;

export const getDefaultOrFallback = <T extends ColumnDefault<any>, V>(
  defaultFnOrValue?: T,
  fallbackValue?: V
) => {
  if (typeof defaultFnOrValue === "function") {
    return defaultFnOrValue();
  } else if (defaultFnOrValue !== undefined) {
    return defaultFnOrValue;
  }

  if (fallbackValue === undefined) {
    throw new Error("Default value must be supplied for this column");
  }

  return fallbackValue;
};
