import { QueryColumns } from "../types/query-model";

/**
 * buildColumnSet
 *
 * @param columns - QueryColumns object
 * @returns A function to fetch columns
 */
export const buildColumnSet = <Columns extends QueryColumns>(
  columns: Columns
) => {
  return <SelectedCols extends Array<keyof Columns>>(
    ...selectedColumns: SelectedCols
  ) => {
    const resultColumnsTuple = selectedColumns.map((columnName) => {
      return [columnName, columns[columnName]];
    });
    const resultColumns = Object.fromEntries(resultColumnsTuple) as {
      [Property in SelectedCols[number]]: Columns[Property];
    };

    return {
      columns: resultColumns,
    };
  };
};
