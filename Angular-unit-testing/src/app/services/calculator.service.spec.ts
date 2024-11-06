import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';
describe('CalculatorService', () => {
  let logger: jasmine.SpyObj<LoggerService>;
  let calService: CalculatorService;

  // beforeEach is used to write common code used in each test. it will create new instance before executing each test case
  beforeEach(() => {
    // creating fake instance of a service
    logger = jasmine.createSpyObj('LoggerService', ['log']);
    // calService = new CalculatorService(logger);
    TestBed.configureTestingModule({
      providers: [CalculatorService, { provide: LoggerService, useValue: logger }],
    });

    calService = TestBed.inject(CalculatorService);
  });

  it('should add two number', () => {
    const res = calService.add(1, 2);
    expect(res).toBe(3);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should multiply two number', () => {
    const res = calService.multiply(1, 2);
    expect(res).toBe(2);
  });
});
