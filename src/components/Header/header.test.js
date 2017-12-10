import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Header from './Header';

describe('Header', () => {
  test('renders correct content', () => {
    const wrapper = renderer
      .create(
        <App context={{ insertCss: () => {}, fetch: () => {} }}>
          <Header />
        </App>,
      )
      .toJSON();
    expect(wrapper.type).toBe('div');
    expect(wrapper.props.className).toBe('root');

    const inner_container = wrapper.children[0];
    expect(inner_container.type).toBe('div');
    expect(inner_container.props.className).toBe('container');

    const nav_area = inner_container.children[0];
    expect(nav_area.props.role).toBe('navigation');

    const brand_name = inner_container.children[1];
    expect(brand_name.type).toBe('a');
    expect(brand_name.props.className).toContain('brand');
    expect(brand_name.children[0]).toBe('Concertify');
  });
});
