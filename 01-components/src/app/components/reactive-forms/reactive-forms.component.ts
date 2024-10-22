import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { gte } from './gte.validator';
import { gteAsync } from './gteAsync.validator';
import { matchPassword } from './matchPassword.validator';
import { IDeactivateComponent } from '../../AuthGuard.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css',
})
export class ReactiveFormsComponent implements OnInit , IDeactivateComponent{
  contactForm: any;
  rolesForm: any;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(10)]],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],

      // for dropdown
      country: [1, [Validators.required]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        // pincode: ['', [Validators.required, gte(20)]],
        pincode: ['', [Validators.required], [gteAsync]],
      }),
    });

    // we can subscribe to value and status change event of form, formGroup and controller
    this.contactForm.get('firstname').valueChanges.subscribe((x: any) => {
      console.log('firstname value changed');

      // takes time to bubble up event so old value to avoid this we can use timeout
      console.log(this.contactForm.value); //still shows the old first name
    });
    this.contactForm
      .get('firstname')
      .statusChanges.subscribe((newStatus: any) => {
        console.log('firstname status changed');
        console.log(newStatus);
        console.log(this.contactForm.status); //Previous status
      });

      

    // create separate array object for cities and keep formArray in form group and when check box is checked add it in formArray as form-control same when unchecked remove
    // https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
    this.rolesForm = this.formBuilder.group({
      admin: true,
      seller: false,
      buyer: false,
    });
  }

  // create new form model without builder
  // contactForm = new FormGroup({
  //   // set default value and other attributes of input elm
  //   firstname: new FormControl({value: 'Aryan', disabled:false}, [Validators.required, Validators.minLength(5)]),
  //   lastname: new FormControl(),
  //   email: new FormControl(),
  //   gender: new FormControl(),
  //   isMarried: new FormControl(),
  //   address:new FormGroup({
  //     city: new FormControl(),
  //     street: new FormControl(),
  //     pincode:new FormControl(),
  //     country: new FormControl(),
  //   })
  // });

  get firstname() {
    return this.contactForm.get('firstname');
  }

  get lastname() {
    return this.contactForm.get('lastname');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get gender() {
    return this.contactForm.get('gender');
  }

  get isMarried() {
    return this.contactForm.get('isMarried');
  }

  get country() {
    return this.contactForm.get('country');
  }

  get city() {
    return this.contactForm.get('address').get('city');
  }

  get street() {
    return this.contactForm.get('address').get('street');
  }

  get pincode() {
    return this.contactForm.get('address').get('pincode');
  }

  setValue() {
    let contact = {
      firstname: 'Rahul',
      lastname: 'Dravid',
      email: 'rahul@gmail.com',
      password: '123',
      confirm: '123',
      gender: 'male',
      isMarried: true,
      country: '1',
      address: {
        city: 'Bangalore',
        street: 'Brigade Road',
        pincode: '600070',
      },
    };
    this.contactForm.get('country').setValue('1');
    
    // this.contactForm.setValue(contact, {onlySelf: false, emitEvent: false});
    this.contactForm.setValue(contact);
  }

  patchName() {
    let contact = {
      firstname: 'Aryan',
      lastname: 'Nipane',
    };

    this.contactForm.patchValue(contact, { emitEvent: false });

    // mark as touched
    this.contactForm.markAsUntouched();

    // set and clear validators
    this.firstname.clearValidators();
    this.firstname.updateValueAndValidity();
  }

  onSubmit() {
    console.log('form submit');
    console.log(this.contactForm.value);
    console.log(this.contactForm.get('firstname').errors);
  }
  onRoleSubmit() {
    console.log(this.rolesForm.value);
  }

  canExit():boolean{
    console.log("helloooo");
    
    // check if any data filled 
    if(this.contactForm.dirty){
      if(confirm("Do you wish to Please confirm")){
        return true
      }else{
        return false;
      }
    }

    return true
  }
}
