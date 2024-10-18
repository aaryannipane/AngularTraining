import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, of } from 'rxjs';

export function gteAsync(
  control: AbstractControl
): Observable<ValidationErrors | null> | null {
  const v: number = +control.value;

  console.log(v);

  if (isNaN(v)) {
    return of({ gte: true, requiredValue: 10 });
  }

  if (v <= 10) {
    return of({ gte: true, requiredValue: 10 });
  }

  return of(null);
}
