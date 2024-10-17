import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent implements OnInit {
  contactForm:any;
  constructor(private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(10)]],
      lastname: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      country: ['1', [Validators.required]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
      })
    });


    this.contactForm.get("firstname").valueChanges.subscribe((x:any)=> {console.log("firstname changed")})
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
    return this.contactForm.get("address").get('city');
  }
 
  get street() {
    return this.contactForm.get("address").get('street');
  }
 
  get pincode() {
    return this.contactForm.get("address").get('pincode');
  }


  setValue() {
 
    let contact = {
      firstname: "Rahul",
      lastname: "Dravid",
      email: "rahul@gmail.com",
      gender: "male",
      isMarried: true,
      country:"1",
      address: {
        city: "Bangalore",
        street: "Brigade Road",
        pincode: "600070"
      }
    };
    this.contactForm.get("country").setValue("1")
    // this.contactForm.setValue(contact, {onlySelf: false, emitEvent: false});
    this.contactForm.setValue(contact);
  }

  patchName() {
    let contact = {
      firstname: "Aryan",
      lastname: "Nipane",
    }
 
    this.contactForm.patchValue(contact);
 
  }

  onSubmit(){
    console.log('form submit');
    console.log(this.contactForm.value);
    console.log(this.contactForm.get("firstname").errors);
  }
}
