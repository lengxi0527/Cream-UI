import {test, expect, describe, vi, type Mocked} from 'vitest';
import { testFn, request } from './utils';
import axios from 'axios';
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;


describe('functions', () => {


  test('testFn calls callback ', () => {
   const callback = vi.fn();
   testFn(15, callback)
   expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(15);
})

test('mock module', async() => {
// mockedAxios.get.mockImplementationOnce(()=>Promise.resolve({data:123}))
mockedAxios.get.mockResolvedValue({data:123});
const result = await request();
expect(result).toBe(123);
})

})
