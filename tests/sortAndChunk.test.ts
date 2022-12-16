import {describe, expect, test} from '@jest/globals';
import sortAndChunk from './sortAndChunk';

describe('sort and chunk', () => {
  test('sorts an object array by date and returns a new array chunked into 5 latest objects by date', () => {
    expect(sortAndChunk([{createdAt:"2021-07-07T04:41:55.606Z"}
    ,{createdAt:"2021-06-22T10:34:47.193Z"} ,
    {createdAt:"2021-05-20T01:13:07.861Z"} ,
    {createdAt:"2021-04-08T21:01:46.141Z"} ,
      {createdAt:"2021-03-31T14:35:04.607Z"} ,
      {createdAt: "2021-08-17T11:34:45.295Z"}],5))
      .toStrictEqual([[{createdAt: "2021-08-17T11:34:45.295Z"},{createdAt:"2021-07-07T04:41:55.606Z"},{createdAt:"2021-06-22T10:34:47.193Z"},{createdAt:"2021-05-20T01:13:07.861Z"},{createdAt:"2021-04-08T21:01:46.141Z"}], [{createdAt:"2021-03-31T14:35:04.607Z"}]]);
  });
});