import { AbstractControl, ValidationErrors } from '@angular/forms';

export function roleRequired(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value.includes(true)) {
    return { noMatch: true };
  }

  return null;
}
