const { average } = require('../utils/for_testing')

describe('average', () => {
    test('of one value', () => {
        expect(average([1])).toBe(1)
    })

    test('of default array', () => {
        expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4)
    })

    test('of empty array', () => {
        expect(average([])).toBeNull()
    })
})