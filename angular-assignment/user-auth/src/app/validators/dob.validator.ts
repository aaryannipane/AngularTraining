import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dobValidator(
  control: AbstractControl
): ValidationErrors | null {
  const userDob = control.value;

  const currentDate = new Date().toISOString().split('T')[0];
  console.info(userDob, currentDate);

  if (userDob > currentDate) {
    return { noMatch: true };
  }

  return null;
}
