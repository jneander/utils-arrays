export interface UniqueValuesOptions<T> {
  identityFn?: (value: T, index: number) => string
}

/**
 * A function which takes an array of items and eliminates duplicates, returning
 * a new instance of the same type of array with duplicates removed.
 *
 * @export
 * @template T
 * @param {T[]} values An array of items of a consistent type.
 * @param {(value: any, index: number) => string} [options.identityFn] An
 * optional function that will be called for each item in the given array. The
 * return value will be used to determine uniqueness for the item.
 * @returns {T[]} An array of the same type as the given array, with duplicates
 * removed according to their identity.
 */
export function uniqueValues<T = any>(values: T[], options: UniqueValuesOptions<T> = {}): T[] {
  const {identityFn} = options

  if (identityFn == null) {
    return Array.from(new Set(values))
  }

  const idMap: {[key: string]: true} = {}
  const result: T[] = []

  values.forEach((value, index) => {
    const id = identityFn(value, index)

    if (!idMap[id]) {
      idMap[id] = true
      result.push(value)
    }
  })

  return result
}
