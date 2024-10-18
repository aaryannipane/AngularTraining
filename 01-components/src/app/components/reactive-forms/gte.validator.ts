import { Injector } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { gteService } from '../../gte.service';

// with args custom validator
export function gte(val: number): ValidatorFn | null {
  // creating injector to inject gte Service
  let injector = Injector.create([
    { provide: gteService, useClass: gteService, deps: [] },
  ]);
  let service = injector.get(gteService);

  return (control: AbstractControl): ValidationErrors | null => {
    const v = +control.value;

    if (control.value === '') {
      return null;
    }

    if (!service.gte(v, val)) {
      return { gte: true, requiredValue: val };
    }

    return null;
  };
}
