import { AbstractControl, ValidationErrors } from '@angular/forms';

export function roleRequired(
  control: AbstractControl
): ValidationErrors | null {
  console.log(control.value);

  //   console.log(Object.values(control.value).includes(true));

      if (!control.value.includes(true)) {
        return { noMatch: true };
      }

  return null;
}
