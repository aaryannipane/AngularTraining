import { TestBed } from '@angular/core/testing';
import { CalcService } from './calc.service';
import { SharedService } from './shared.service';
import { share } from 'rxjs';

// describe is used to create test suite
describe('CalcService', () => {
  // f is prefixed to only execute this test suite or spec
  // fdescribe('CalcService', () => {
  let shared: SharedService;
  let calc: CalcService;

  // runs before each specs
  beforeEach(() => {
    console.log('Before Each called');

    shared = jasmine.createSpyObj('SharedService', ['mySharedFunction']);

    // test bed used for dependency injection
    TestBed.configureTestingModule({
      // providers: [SharedService, CalcService],

      // passing spyObject which is not called
      providers: [{ provided: SharedService, useValue: shared }, CalcService],
    });

    shared = TestBed.inject(SharedService);
    calc = TestBed.inject(CalcService);
  });

  // it is used to create spec or specification
  it('should multiply two number', () => {
    const shared = new SharedService();
    // passing dependency
    const calc = new CalcService(shared);
    const result = calc.multiply(3, 5);

    // expect is used to check value with methods like toBe and all
    expect(result).toBe(15);
  });

  it('should add two number', () => {
    const shared = new SharedService();
    // passing dependency
    const calc = new CalcService(shared);
    const result = calc.add(3, 5);

    // expect is used to check value with methods like toBe and all
    expect(result).toBe(8);
  });

  // to check whether the mySharedFunction is called in multiply func using spy
  // it('should call the mySharedFunction func', () => {
  //   // creates shared service always and constructor is run
  //   // const shared = new SharedService();

  //   //
  //   const shared = jasmine.createSpyObj('SharedService', ['mySharedFunction']);

  //   const calc = new CalcService(shared);

  //   // this does'nt call the multiply function this only spies on previous multiply function
  //   // spyOn(shared, 'mySharedFunction');

  //   // used to call function here
  //   // spyOn(shared, "mySharedFunction").and.callThrough()
  //   const result = calc.multiply(3, 5);
  //   expect(shared.mySharedFunction).toHaveBeenCalled();
  // });
});
