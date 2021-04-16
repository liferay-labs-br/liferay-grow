import { paginate, slugify } from '../../../src/utils/globalMethods';

describe('GlobalMethods', () => {
  it('should normalize slugify with many variants', () => {
    expect(slugify('liferay-grow')).toBe('liferay-grow');
    expect(slugify('LIFERAY-GROW')).toBe('liferay-grow');
    expect(slugify('liferay_grow')).toBe('liferay-grow');
    expect(slugify('liferay________grow')).toBe('liferay-grow');
    expect(slugify('liferay__grow')).toBe('liferay-grow');
    expect(slugify('lífêráy-gròw')).toBe('liferay-grow');
    expect(slugify('lífêráy-gròw++')).toBe('liferay-grow');
    expect(slugify('lífêráy-gròw#!#')).toBe('liferay-grow');
    expect(slugify('lífêráy-gròw#!#')).toBe('liferay-grow');
  });

  it('should test paginate', () => {
    expect(paginate(10)).toStrictEqual({
      currentPage: 1,
      endIndex: 9,
      endPage: 1,
      pageSize: 10,
      pages: [1],
      startIndex: 0,
      startPage: 1,
      totalItems: 10,
      totalPages: 1,
    });

    expect(paginate(20)).toStrictEqual({
      currentPage: 1,
      endIndex: 9,
      endPage: 2,
      pageSize: 10,
      pages: [1, 2],
      startIndex: 0,
      startPage: 1,
      totalItems: 20,
      totalPages: 2,
    });
  });
});
