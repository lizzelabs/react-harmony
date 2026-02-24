import { Styles } from './styles';

describe('Styles test', () => {
  it('Should create a new instance', () => {
    expect(new Styles()).toBeTruthy();
  });

  it('Should insert a new style', () => {
    const style = new Styles();

    expect(() =>
      style.apply({ 'html, body': { width: '100%' } }),
    ).not.toThrow();
  });
});
