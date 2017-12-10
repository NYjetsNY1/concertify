/**
  We need to manually specify credentials as we don't actually start our server.
    -> This can be done by manually retrieving a Spotify access token from
       the web API console.
  These tests assume successful calls to the Spotify API work as intended.
  TODO: mock API calls?
* */

import SetListActions from './setlist-actions';
import 'babel-polyfill';

// to test if jest is working at all -- should always pass.
describe('Tests to verify that jest is working as intended.', () => {
  it('If 2 + 2 does not equal 4, you know there is something seriously wrong. This should always pass.', () => {
    expect(2 + 2).toBe(4);
  });
  it('String Test.', () => {
    expect("Bob").toBe("Bob");
  });
  it('Empty Test.', () => {
    expect("").toBe("");
  });
});

describe('Unit Tests', () => {
  test('fullSetListTest() should be called.', async () => {
    SetListActions.getArtist = jest.spyOn(SetListActions,
      'fullSetlistTest');
    const response = await SetListActions.fullSetlistTest();
    expect(SetListActions.getArtist).toBeCalled();
  });
});