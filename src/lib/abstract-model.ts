import { ModelColumnsDefinition } from "../types/QueryModel";

export class AbstractModel {
  constructor() {}
  columns: ModelColumnsDefinition = {};
  data: Record<string, any> | null = null;
}
