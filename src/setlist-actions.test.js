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
describe('Validate that Jest Works:', () => {
  it('If 2 + 2 does not equal 4, you know there is something seriously wrong. This should always pass.', () => {
    expect(2 + 2).toBe(4);
  });
  it('String Test.', () => {
    expect("Bob").toBe("Bob");
  });
  it('Empty Test.', () => {
    expect("").toBe("");
  });
  it('Drake Test.', () => {
    expect("Drake").toBe("Drake");
  });
  it('Subtraction Test.', () => {
    expect(5 - 4).toBe(1);
  });
});


describe('Unit Tests for SetList API:', () => {
  
  // If this test fails, try re-running. Could be the fact that
  // jest quits after 5-6 seconds (standard timeout)
  // and the call could take longer if the heroku proxy is slow.
  test('Test #1: getArtist() should be called.', async () => {
    SetListActions.getArtist = jest.spyOn(SetListActions,
      'fullSetlistTest');
    const response = await SetListActions.fullSetlistTest('Drake');
    expect(SetListActions.getArtist).toBeCalled();
  });
  test('Test #2: Example test to find artist.', async () => {
    let response = await SetListActions.fullSetlistTest('Drake');
    response = JSON.parse(response);
    expect(response.artist[0].name).toBe('Drake');
  });

});