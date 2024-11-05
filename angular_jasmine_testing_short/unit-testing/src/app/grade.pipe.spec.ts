import { GradePipe } from './grade.pipe';

describe('GradePipe', () => {
  it('create an instance', () => {
    const pipe = new GradePipe();
    expect(pipe).toBeTruthy();
  });

  it('should assign A grade when mark greater than 89', () => {
    const pipe = new GradePipe();
    const grade = pipe.transform(93);
    expect(grade).toBe('A');
  });
});
