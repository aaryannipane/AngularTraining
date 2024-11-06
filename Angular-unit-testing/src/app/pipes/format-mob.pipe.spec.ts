import { FormatMobPipe } from './format-mob.pipe';

describe('FormatMobPipe', () => {
  it('should format no to INR by default', () => {
    const pipe = new FormatMobPipe();

    const res = pipe.transform(12345);

    expect(res).toEqual('+91-12345');
  });
  it('should format no to USA by default', () => {
    const pipe = new FormatMobPipe();

    const res = pipe.transform(12345, 'USA');

    expect(res).toEqual('+1-12345');
  });
});
