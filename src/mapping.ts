import {rangeInts} from './ranges'

/**
 * A function which takes an array and returns an array containing each index of
 * the given array.
 *
 * @export
 * @param {any[]} array An array of any values.
 * @returns {number[]} An array containing each index of the given array.
 */
export function arrayIndices(array: any[]): number[] {
  return rangeInts(0, array.length, {exclusiveEnd: true})
}
