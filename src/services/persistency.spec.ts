import { Persistency } from './persistency';

describe('Persistency', () => {

  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    // sut = System Under Test
    const sut = new Persistency();
    expect(sut.saveOrder()).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = new Persistency();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with the string that I want', () => {
    const sut = new Persistency();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledWith('Saved with success');
  });
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
