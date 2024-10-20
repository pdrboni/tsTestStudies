import { Persistency } from './persistency';

describe('Persistency', () => {
  it('should return undefined', () => {
    // sut = System Under Test
    const sut = new Persistency();
    expect(sut.saveOrder()).toBeUndefined();
  })
})

describe('Testing 1', () => {
  it(`should be a test`, () => {
    const number = 1;
    expect(number).toBe(1);
  });
});

describe('Testing 2', () => {
  test(`should be another test`, () => {
    const number = 3;
    expect(number).not.toBe(1);
  });
});
