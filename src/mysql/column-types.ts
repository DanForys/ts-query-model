import { classToInvokable } from "@/lib/classToInvokable";

export abstract class MySQLColumn {
  primary = false;
  autoIncrement = false;

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

class JSONSTRING<T> extends MySQLColumn {
  get(value: string) {
    return JSON.parse(value) as T;
  }
  set(value: T) {
    return JSON.stringify(value);
  }
}

class ENUM<T> extends MySQLColumn {
  get(value: T) {
    return value;
  }
  set(value: T) {
    return value;
  }
}

export default {
  STRING: classToInvokable(STRING),
  BOOL: classToInvokable(BOOL),
  DATE: classToInvokable(DATE),
  JSONSTRING: classToInvokable(JSONSTRING),
  ENUM: classToInvokable(ENUM),
};
