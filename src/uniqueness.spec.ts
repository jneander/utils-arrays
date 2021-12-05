import {expect} from 'chai'
import {stub} from 'sinon'

import {arrayIndices} from './mapping'
import {uniqueValues} from './uniqueness'

describe('uniqueness', () => {
  describe('.uniqueValues()', () => {
    it('returns the unique values in the given array', () => {
      const values = uniqueValues([1, 1, 2, 3, 2, 4, 5, 3])
      expect(values).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('returns the same content when all values are unique', () => {
      const values = uniqueValues([1, 2, 3, 4, 5])
      expect(values).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('supports string values', () => {
      const values = uniqueValues(['a', 'a', 'b', 'c', 'b', 'd', 'e', 'c'])
      expect(values).to.deep.equal(['a', 'b', 'c', 'd', 'e'])
    })

    it('returns an empty array when given an empty array', () => {
      const values = uniqueValues([])
      expect(values).to.deep.equal([])
    })

    context('when given an identityFn', () => {
      function numberToString(value: number): string {
        return String(value)
      }

      it('calls the identity function for each item in the array', () => {
        const identityFn = stub().callsFake(numberToString)
        const values = [1, 1, 2, 3, 2, 4, 5, 3]
        uniqueValues(values, {identityFn})
        expect(identityFn.callCount).to.equal(values.length)
      })

      it('calls the identity function with each value', () => {
        const identityFn = stub().callsFake(numberToString)
        const values = [1, 1, 2, 3, 2, 4, 5, 3]
        uniqueValues(values, {identityFn})
        const valuesFromCalls = identityFn.getCalls().map(call => call.args[0])
        expect(valuesFromCalls).to.deep.equal(values)
      })

      it('calls the identity function with each array index', () => {
        const identityFn = stub().callsFake(numberToString)
        const values = [1, 1, 2, 3, 2, 4, 5, 3]
        uniqueValues(values, {identityFn})
        const valuesFromCalls = identityFn.getCalls().map(call => call.args[1])
        expect(valuesFromCalls).to.deep.equal(arrayIndices(values))
      })

      it('uses the identity function result to determine uniqueness', () => {
        function roundedId(value: number): string {
          return Math.round(value).toString()
        }
        const values = uniqueValues([1.1, 1.2, 2.1, 3, 2.7, 4, 5.9, 3.8], {identityFn: roundedId})
        expect(values).to.deep.equal([1.1, 2.1, 3, 4, 5.9])
      })
    })
  })
})
