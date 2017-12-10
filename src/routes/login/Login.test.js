import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../components/App';
import Login from './Login';

describe('Home', () => {
  test('renders correct content', () => {
    const wrapper = renderer
    .create(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Login></Login>
      </App>,
    )
      .toJSON();

      expect(wrapper.type).toBe('div');
      expect(wrapper.props.className).toContain('root');
      expect(wrapper.children.length).toBeGreaterThanOrEqual(2);

      let aboutContainter = wrapper.children[0];
      expect(aboutContainter.type).toBe('a');
      expect(aboutContainter.props.href).toBe('/about');

      let playlistContainter = wrapper.children[1];
      expect(playlistContainter.type).toBe('a');
      expect(playlistContainter.props.href).toBe('/auth');
  });
});
