import { LimitCaractersPipe } from './limit-caracters.pipe';

describe('LimitCaractersPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitCaractersPipe();
    expect(pipe).toBeTruthy();
  });
});
