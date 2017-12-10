import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Footer from './Footer';

describe('Footer', () => {
  test('renders correct content', () => {
    const wrapper = renderer
      .create(
        <App context={{ insertCss: () => {}, fetch: () => {} }}>
          <Footer />
        </App>,
      )
      .toJSON();
    expect(wrapper.type).toBe('div');
    expect(wrapper.props.className).toBe('root');

    const inner_container = wrapper.children[0];
    expect(inner_container.type).toBe('div');
    expect(inner_container.props.className).toBe('container');

    const logo = inner_container.children[0];
    expect(logo.type).toBe('span');
    expect(logo.children[0]).toContain('Concertify');
  });
});
