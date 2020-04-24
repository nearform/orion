import getParentPath from './get-parent-path'

const mockAncestry = [
  {
    ancestor: {
      id: 2,
      path: '/latest-news',
      title: 'Latest news',
    },
    direct: false,
  },
  {
    ancestor: {
      id: 3,
      path: '/latest-news/other-news',
      title: 'Other news',
    },
    direct: true,
  },
]

describe('getParentPath util function', () => {
  describe('when there is a direct ancestor', () => {
    it('returns the path value of the direct parent in ancestry', () => {
      expect(getParentPath(mockAncestry)).toEqual('/latest-news/other-news')
    })
  })
  describe('When there is NO direct ancestor', () => {
    it('returns an empty string', () => {
      expect(getParentPath([])).toEqual('')
    })
  })
})
