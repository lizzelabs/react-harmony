import { splitProps } from './splitProps';

describe('splitProps Tests', () => {
  it('It should split between unknow props and know props', () => {
    const { known, unknown } = splitProps(
      { value: 1, current: 'ok', status: 'danger' },
      ['status'],
    );

    expect(JSON.stringify(known)).toBe(`{"status":"danger"}`);
    expect(JSON.stringify(unknown)).toBe(`{"value":1,"current":"ok"}`);
  });
});
