import { classToInvokable } from "../lib/classToInvokable";

export abstract class MySQLColumn {
  primary = false;
  autoIncrement = false;

  constructor() {}

  get(value: unknown) {
    return value;
  }
  set(value: unknown) {
    return value;
  }
  PRIMARY() {
    this.primary = true;
    return this;
  }
  AUTO_INCREMENT() {
    this.autoIncrement = true;
    return this;
  }
}

class STRING extends MySQLColumn {
  get(value: unknown) {
    return `${value}`;
  }
  set(value: unknown) {
    return `${value}`;
  }
}

class BOOL extends MySQLColumn {
  get(value: unknown) {
    return Boolean(value);
  }
  set(value: unknown) {
    return Boolean(value);
  }
}

class DATE extends MySQLColumn {
  get(value: string) {
    return new Date(value);
  }
  set(value: string | number | Date) {
    return Boolean(value);
  }
}

const JSONSTRING = <T extends object>() => ({
  get: (value: string) => {
    return JSON.parse(value) as T;
  },
  set: (value: T) => {
    return JSON.stringify(value);
  },
});

const ENUM = <T extends string[]>() => ({
  get: function (value: string): T[number] {
    return value;
  },
  set: function (value: T[number]) {
    return value;
  },
});

export default {
  STRING: classToInvokable(STRING),
  BOOL: classToInvokable(BOOL),
  DATE: classToInvokable(DATE),
  JSONSTRING: JSONSTRING,
  ENUM: ENUM,
};
