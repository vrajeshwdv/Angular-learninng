import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/username.validator';
import { passwordValidator } from '../shared/password.validator';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup | any; // here is the declaration
  // submitted: boolean = false;
  url:any="";
  // the keyword get is used beacuse it's mean we doesn't require paranthesis
  get getRegistrationFormControl() {
    return this.registrationForm.controls;
  }

  get alternateEmails(){
    return this.getRegistrationFormControl.alternateEmails;
  }

  addAlternateEmail(){
    this.getRegistrationFormControl.alternateEmails.push(new FormControl(""))
  }

  constructor(private fb: FormBuilder,private registrationService:RegisterService) { }

  //this function is used for initialize form
  initForm() {

    this.registrationForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
      email: new FormControl(''),
      subscribe: new FormControl(false),
      birthdate: new FormControl(new Date().getDate()),
      fullname: new FormControl(''),
      gender: new FormControl(''),
      category:new FormControl(''),
      address: this.fb.group({
        city: new FormControl(''),
        state: new FormControl(''),
        postalCode: new FormControl('')
      }),
      alternateEmails:this.fb.array([])
    }, { validator: passwordValidator })

  }
  ngOnInit(): void {
    this.initForm();
    // console.log(this.getRegistrationFormControl.subscribe);
    this.getRegistrationFormControl.subscribe.valueChanges
    .subscribe(checkedValue => {
      const email = this.getRegistrationFormControl.email;
      if (checkedValue) {
        email.setValidators(Validators.required);
      }
      else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }

  onSubmit() {
   
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value).then((res)=>{
      console.log(res);
      
    });

  }

  loadApiData() {
    this.registrationForm.patchValue({
      username: "vrajesh",
      password: "123456",
      confirmPassword: "123456",
      email: "abc123@gmail.com",
      subscribe: false,
      birthdate: new Date().getDate(),
      fullname: "Vrajesh Soni",
      gender: "male",
      address: {
        city: "Vadodara",
        state: "Gujarat",
        postalCode: "390017"
      }


    });
  }
  onSelectProfilePic(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
}
