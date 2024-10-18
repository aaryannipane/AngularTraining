import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPassword(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirm')?.value;

  console.log('match password');

  if (password != confirm) {
    return { noMatch: true };
  }
  console.log('match password end');
  return null;
}
