export function isNullable<T>(value: T) {
  return value === null || value === undefined;
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return !isNullable(value);
}
