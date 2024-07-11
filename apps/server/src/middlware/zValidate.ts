import type { Env, Input, MiddlewareHandler, ValidationTargets } from 'hono';
import { validator } from 'hono/validator';
import { type ZodSchema, type z } from 'zod';

type HasUndefined<T> = undefined extends T ? true : false;

export const zValidator = <
  Target extends keyof ValidationTargets,
  T extends ZodSchema,
  E extends Env,
  P extends string,
  In = z.input<T>,
  Out = z.output<T>,
  I extends Input = {
    in: HasUndefined<In> extends true
      ? {
          [K in Target]?: K extends 'json'
            ? In
            : HasUndefined<keyof ValidationTargets[K]> extends true
              ? { [K2 in keyof In]?: ValidationTargets[K][K2] }
              : { [K2 in keyof In]: ValidationTargets[K][K2] };
        }
      : {
          [K in Target]: K extends 'json'
            ? In
            : HasUndefined<keyof ValidationTargets[K]> extends true
              ? { [K2 in keyof In]?: ValidationTargets[K][K2] }
              : { [K2 in keyof In]: ValidationTargets[K][K2] };
        };
    out: { [K in Target]: Out };
  },
  V extends I = I,
>(
  schema: T,
  target: Target,
): MiddlewareHandler<E, P, V> =>
  // @ts-expect-error not typed well
  validator(target, async (value) => {
    const result = await schema.safeParseAsync(value);

    if (!result.success) {
      throw new Error(`Invalid ${target}.`);
    }

    return result.data as Promise<z.infer<T>>;
  });
