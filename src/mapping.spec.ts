import {expect} from 'chai'

import {arrayIndices} from './mapping'

describe('mapping', () => {
  describe('.arrayIndices()', () => {
    const aThroughE = ['A', 'B', 'C', 'D', 'E']

    it('returns the indices of the given array', () => {
      const indices = arrayIndices(aThroughE)
      expect(indices).to.deep.equal([0, 1, 2, 3, 4])
    })

    it('returns the indices for an array of length 1', () => {
      const indices = arrayIndices(['A'])
      expect(indices).to.deep.equal([0])
    })

    it('returns an empty array when given an empty array', () => {
      const indices = arrayIndices([])
      expect(indices).to.deep.equal([])
    })
  })
})
