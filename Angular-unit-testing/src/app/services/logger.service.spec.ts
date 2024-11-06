import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  it('should log the message', () => {
    // fake call to console.log not actual call using spyOn this will also track the method
    spyOn(console, 'log');

    const message = 'Angular Unit Testing';
    const logger = new LoggerService();

    logger.log(message);

    // assertion
    // when logger log method is called then in it console.log methods is called only one time
    expect(console.log).toHaveBeenCalledTimes(1);


    // withContext is for custom error message to show when failed

    // expect(console.log)
    //   .withContext('should have called only once')
    //   .toHaveBeenCalledTimes(1);

    // log method is called with specified argument when logger.log method is called
    expect(console.log).toHaveBeenCalledWith(`LOGGER LOG:${message}`);
  });
});
