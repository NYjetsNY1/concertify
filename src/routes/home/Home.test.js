import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../components/App';
import Home from './Home';

describe('Home', () => {
  test('renders correct content', () => {
    const wrapper = renderer
    .create(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <Home></Home>
      </App>,
    )
      .toJSON();

    expect(wrapper.props.className).toContain('banner');
    expect(wrapper.children.length).toBeGreaterThanOrEqual(4);

    let bannerTitleContainer = wrapper.children[0];
    expect(bannerTitleContainer.props.className).toContain('container');

    let bannerTitle = bannerTitleContainer.children[0];
    expect(bannerTitle.children[0]).toContain('Welcome To Concertify');
    expect(bannerTitle.type).toBe('h1');

    let breaker = wrapper.children[1];
    expect(breaker.type).toBe('hr');

    let form = wrapper.children[2];
    expect(form.type).toBe('form');
    expect(form.children.length).toBeGreaterThanOrEqual(1);
    expect(form.children[0].children[0].type).toBe('label');
    expect(form.children[0].children[0].props.htmlFor).toBe('artistName');

    let submit = wrapper.children[3];
    expect(submit.props.className).toBe('formGroup');
    let submitBtn = (submit.children[0].children[0]);
    expect(submitBtn.type).toBe('button');
  });
});
