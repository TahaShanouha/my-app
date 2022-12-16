import {describe, expect, test} from '@jest/globals';
import fetchProperDateFormat from './fetchProperDateFormat';

describe('fetch proper date format', () => {
  test('returns proper date format from string date format', () => {
    expect(fetchProperDateFormat("2021-08-17T11:34:45.295Z")).toBe("17/8/2021");
  });
});