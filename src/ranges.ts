export interface RangeOptions {
  exclusiveEnd?: boolean
  exclusiveStart?: boolean
  step?: number
}

function toChar(value: number): string {
  return String.fromCharCode(value)
}

/**
 * A function which takes two characters and returns an ordered array of those
 * characters and each character between them.
 *
 * @export
 * @param {string} start The character which starts the resulting range.
 * @param {string} end The character which ends the resulting range.
 * @param {boolean} [options.exclusiveEnd=false] When true, the given end
 * character will excluded from the resulting range.
 * @param {boolean} [options.exclusiveStart=false] When true, the given start
 * character will excluded from the resulting range.
 * @param {boolean} [options.step=1] The change in value from one character to
 * the next character in the range. This must be a positive integer.
 * @returns {string[]} An ordered array of those characters and each character
 * between them.
 */
export function rangeChars(start: string, end: string, options: RangeOptions = {}): string[] {
  if (start.length !== 1 || end.length !== 1) {
    return []
  }

  const startNumber: number = start.charCodeAt(0)
  const endNumber: number = end.charCodeAt(0)

  return rangeWithTransform<string>(startNumber, endNumber, toChar, options)
}

function toItself(value: number): number {
  return value
}

/**
 * A function which takes two integers and returns an ordered array of those
 * integers and each integer between them.
 *
 * @export
 * @param {string} start The integer which starts the resulting range.
 * @param {string} end The integer which ends the resulting range.
 * @param {boolean} [options.exclusiveEnd=false] When true, the given end
 * integer will excluded from the resulting range.
 * @param {boolean} [options.exclusiveStart=false] When true, the given start
 * integer will excluded from the resulting range.
 * @param {boolean} [options.step=1] The change in value from one integer to the
 * next integer in the range. This must be a positive integer.
 * @returns {string[]} An ordered array of those integers and each integer
 * between them.
 */
export function rangeInts(start: number, end: number, options: RangeOptions = {}): number[] {
  return rangeWithTransform<number>(start, end, toItself, options)
}

function rangeWithTransform<T>(
  start: number,
  end: number,
  transformFn: (value: number) => T,
  options: RangeOptions
): T[] {
  const {exclusiveEnd = false, exclusiveStart = false, step = 1} = options

  const stepValue = Math.max(1, Math.floor(step))
  let startValue: number = Math.floor(start)
  let endValue: number = Math.floor(end)

  const result: T[] = []

  if (start <= end) {
    startValue += Number(exclusiveStart)
    endValue -= Number(exclusiveEnd)

    for (let i = startValue; i <= endValue; i += stepValue) {
      result.push(transformFn(i))
    }
  } else {
    startValue -= Number(exclusiveStart)
    endValue += Number(exclusiveEnd)

    for (let i = startValue; i >= endValue; i -= stepValue) {
      result.push(transformFn(i))
    }
  }

  return result
}
