import {expect} from 'chai'

import {rangeChars, rangeInts} from './ranges'

describe('ranges', () => {
  describe('.rangeChars()', () => {
    it('returns an ordered array of the characters between the given start and end (inclusive)', () => {
      const range = rangeChars('a', 'f')
      expect(range).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f'])
    })

    it('optionally uses an exclusive end index', () => {
      const range = rangeChars('a', 'f', {exclusiveEnd: true})
      expect(range).to.deep.equal(['a', 'b', 'c', 'd', 'e'])
    })

    it('optionally uses an exclusive start index', () => {
      const range = rangeChars('a', 'f', {exclusiveStart: true})
      expect(range).to.deep.equal(['b', 'c', 'd', 'e', 'f'])
    })

    it('optionally uses exclusive start and end indices', () => {
      const range = rangeChars('a', 'f', {exclusiveEnd: true, exclusiveStart: true})
      expect(range).to.deep.equal(['b', 'c', 'd', 'e'])
    })

    it('optionally increments by the given step value', () => {
      const range = rangeChars('a', 'f', {step: 2})
      expect(range).to.deep.equal(['a', 'c', 'e'])
    })

    it('respects exclusive starts with the step value', () => {
      const range = rangeChars('a', 'f', {exclusiveStart: true, step: 2})
      expect(range).to.deep.equal(['b', 'd', 'f'])
    })

    it('respects exclusive ends with the step value', () => {
      const range = rangeChars('a', 'e', {exclusiveEnd: true, step: 2})
      expect(range).to.deep.equal(['a', 'c'])
    })

    it('respects combined exclusive starts and ends with the step value', () => {
      const range = rangeChars('a', 'f', {exclusiveEnd: true, exclusiveStart: true, step: 2})
      expect(range).to.deep.equal(['b', 'd'])
    })

    context('when the end is less than the start', () => {
      it('returns an array in descending order', () => {
        const range = rangeChars('f', 'a')
        expect(range).to.deep.equal(['f', 'e', 'd', 'c', 'b', 'a'])
      })

      it('optionally uses an exclusive end index', () => {
        const range = rangeChars('f', 'a', {exclusiveEnd: true})
        expect(range).to.deep.equal(['f', 'e', 'd', 'c', 'b'])
      })

      it('optionally uses an exclusive start index', () => {
        const range = rangeChars('f', 'a', {exclusiveStart: true})
        expect(range).to.deep.equal(['e', 'd', 'c', 'b', 'a'])
      })

      it('optionally uses exclusive start and end indices', () => {
        const range = rangeChars('f', 'a', {exclusiveEnd: true, exclusiveStart: true})
        expect(range).to.deep.equal(['e', 'd', 'c', 'b'])
      })

      it('optionally decrements by the given step value', () => {
        const range = rangeChars('f', 'a', {step: 2})
        expect(range).to.deep.equal(['f', 'd', 'b'])
      })

      it('respects exclusive starts with the decrementing step value', () => {
        const range = rangeChars('f', 'a', {exclusiveStart: true, step: 2})
        expect(range).to.deep.equal(['e', 'c', 'a'])
      })

      it('respects exclusive ends with the decrementing step value', () => {
        const range = rangeChars('e', 'a', {exclusiveEnd: true, step: 2})
        expect(range).to.deep.equal(['e', 'c'])
      })

      it('respects combined exclusive starts and ends with the decrementing step value', () => {
        const range = rangeChars('f', 'a', {exclusiveEnd: true, exclusiveStart: true, step: 2})
        expect(range).to.deep.equal(['e', 'c'])
      })
    })

    it('returns an empty array when given a blank start character', () => {
      const range = rangeChars('', 'e')
      expect(range).to.deep.equal([])
    })

    it('returns an empty array when given a blank end character', () => {
      const range = rangeChars('a', '')
      expect(range).to.deep.equal([])
    })

    it('ignores decimals in the step value', () => {
      const range = rangeChars('a', 'f', {step: 2.75})
      expect(range).to.deep.equal(['a', 'c', 'e'])
    })
  })

  describe('.rangeInts()', () => {
    it('returns an ordered array of the integers between the given start and end (inclusive)', () => {
      const range = rangeInts(0, 5)
      expect(range).to.deep.equal([0, 1, 2, 3, 4, 5])
    })

    it('optionally uses an exclusive end index', () => {
      const range = rangeInts(0, 5, {exclusiveEnd: true})
      expect(range).to.deep.equal([0, 1, 2, 3, 4])
    })

    it('optionally uses an exclusive start index', () => {
      const range = rangeInts(0, 5, {exclusiveStart: true})
      expect(range).to.deep.equal([1, 2, 3, 4, 5])
    })

    it('optionally uses exclusive start and end indices', () => {
      const range = rangeInts(0, 5, {exclusiveEnd: true, exclusiveStart: true})
      expect(range).to.deep.equal([1, 2, 3, 4])
    })

    it('optionally increments by the given step value', () => {
      const range = rangeInts(0, 5, {step: 2})
      expect(range).to.deep.equal([0, 2, 4])
    })

    it('respects exclusive starts with the step value', () => {
      const range = rangeInts(0, 5, {exclusiveStart: true, step: 2})
      expect(range).to.deep.equal([1, 3, 5])
    })

    it('respects exclusive ends with the step value', () => {
      const range = rangeInts(0, 4, {exclusiveEnd: true, step: 2})
      expect(range).to.deep.equal([0, 2])
    })

    it('respects combined exclusive starts and ends with the step value', () => {
      const range = rangeInts(0, 5, {exclusiveEnd: true, exclusiveStart: true, step: 2})
      expect(range).to.deep.equal([1, 3])
    })

    context('when the end is less than the start', () => {
      it('returns an array in descending order', () => {
        const range = rangeInts(5, 0)
        expect(range).to.deep.equal([5, 4, 3, 2, 1, 0])
      })

      it('optionally uses an exclusive end index', () => {
        const range = rangeInts(5, 0, {exclusiveEnd: true})
        expect(range).to.deep.equal([5, 4, 3, 2, 1])
      })

      it('optionally uses an exclusive start index', () => {
        const range = rangeInts(5, 0, {exclusiveStart: true})
        expect(range).to.deep.equal([4, 3, 2, 1, 0])
      })

      it('optionally uses exclusive start and end indices', () => {
        const range = rangeInts(5, 0, {exclusiveEnd: true, exclusiveStart: true})
        expect(range).to.deep.equal([4, 3, 2, 1])
      })

      it('optionally decrements by the given step value', () => {
        const range = rangeInts(5, 0, {step: 2})
        expect(range).to.deep.equal([5, 3, 1])
      })

      it('respects exclusive starts with the decrementing step value', () => {
        const range = rangeInts(5, 0, {exclusiveStart: true, step: 2})
        expect(range).to.deep.equal([4, 2, 0])
      })

      it('respects exclusive ends with the decrementing step value', () => {
        const range = rangeInts(4, 0, {exclusiveEnd: true, step: 2})
        expect(range).to.deep.equal([4, 2])
      })

      it('respects combined exclusive starts and ends with the decrementing step value', () => {
        const range = rangeInts(5, 0, {exclusiveEnd: true, exclusiveStart: true, step: 2})
        expect(range).to.deep.equal([4, 2])
      })
    })

    it('ignores decimals in the start value', () => {
      const range = rangeInts(0.75, 5)
      expect(range).to.deep.equal([0, 1, 2, 3, 4, 5])
    })

    it('ignores decimals in the end value', () => {
      const range = rangeInts(0, 5.75)
      expect(range).to.deep.equal([0, 1, 2, 3, 4, 5])
    })

    it('ignores decimals in the step value', () => {
      const range = rangeInts(0, 5, {step: 2.75})
      expect(range).to.deep.equal([0, 2, 4])
    })
  })
})
