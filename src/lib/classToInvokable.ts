type Callable<A extends abstract new () => unknown> = A extends new (
  ...args: infer Args
) => infer Instance
  ? A & ((...args: Args) => Instance)
  : never;

/**
 * Wraps a constructor to not need the `new` keyword using a proxy.
 * Only used for data types.
 *
 * @param constructor The class instance to wrap as invocable.
 * @returns Wrapped class instance.
 * @private
 */
export function classToInvokable<
  Class extends new (...args: unknown[]) => unknown
>(constructor: Class): Callable<Class> {
  return new Proxy<Callable<Class>>(constructor as Callable<Class>, {
    apply(_target, _thisArg, args: ConstructorParameters<Class>) {
      return new constructor(...args);
    },
  });
}
