import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { RegisteredUser } from './registeredUser';

const passwordMatchValidator: ValidatorFn = (controlForm: FormGroup) => {
  const password = controlForm.get('password');
  console.log(password);
  const confirmPassword = controlForm.get('confirmPassword');
  console.log(confirmPassword);
  console.log(password.value !== confirmPassword.value);

  if (password.value !== confirmPassword.value) {
    return { passwordMissmatch: true };
  } else {
    return null;
  }
};

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent implements OnInit {

  contactForm: FormGroup;
  user: RegisteredUser;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.pattern('^[0-9-+\ )(].{8,}$')),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[@#$%^&]).{8,}$')]),
      confirmPassword: new FormControl('', Validators.required),
      pet: new FormControl('other', Validators.required),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      building: new FormControl('', [Validators.required, Validators.minLength(1)]),
      flatNo: new FormControl(null),
      newsletter: new FormControl(false, Validators.requiredTrue),
      sms: new FormControl(false)
    }, {validators: passwordMatchValidator});

    this.contactForm.statusChanges.subscribe(value => {
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.user);
    let name = this.contactForm.value.name.trim();
    let surname = this.contactForm.value.surname.trim();
    let email = this.contactForm.value.email.trim();
    let phone = this.contactForm.value.phone.trim();
    let password = this.contactForm.value.password.trim();
    let pet = this.contactForm.value.pet;
    let city = this.contactForm.value.city.trim();
    let street = this.contactForm.value.street.trim();
    let building = this.contactForm.value.building.trim();
    let flatNo = this.contactForm.value.flatNo.trim();
    let newsletter = this.contactForm.value.newsletter;
    let sms = this.contactForm.value.sms;

    this.user = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: password,
      pet: pet,
      address: {
        city: city,
        street: street,
        building: building,
        flatNo: flatNo
      },
      consents: {
        newsletter: newsletter,
        sms: sms
      }
    };

    this.onReset();
    console.log(this.user);
  }

  onReset() {
    this.contactForm.reset({});
  }

}
