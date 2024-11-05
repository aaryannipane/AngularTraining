import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));

document.querySelectorAll('.pass-eye').forEach((eye) => {
  console.log(eye);
  
  eye.addEventListener('click', (e) => {
    if (eye.classList.contains('glyphicon-eye-open')) {
      eye.classList.remove('glyphicon-eye-open');
      eye.classList.add('glyphicon-eye-close');
    } else {
      eye.classList.add('glyphicon-eye-open');
      eye.classList.remove('glyphicon-eye-close');
    }
  });
});
