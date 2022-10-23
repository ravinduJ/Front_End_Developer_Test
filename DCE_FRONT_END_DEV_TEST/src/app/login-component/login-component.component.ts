import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginRegistrationService } from '../services/login-registration.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public confirmPassword = new FormControl('', [Validators.required]);
  public userDetails: any | undefined;

  public loginEmail = new FormControl('', [Validators.required, Validators.email]);
  public loginPassword = new FormControl('', [Validators.required]);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private createUser: LoginRegistrationService, private router : Router, private _snackBar: MatSnackBar) { }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageLogin() {
    if (this.loginEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginEmail.hasError('email') ? 'Not a valid email' : '';
  }

  userLogin(){ 

    let loginData = {
      email: this.loginEmail.value,
      password: this.loginPassword.value
    }

    this.createUser.login(loginData).subscribe((response) => {
      console.log("login Response: ", response);
      if (response.status == 400) { 
        console.log("error");
      }
      this.router.navigate(['/view-users']);
    });
  }

  userSignup() { 
    this.userDetails = {
      username: this.username.value,
      email: this.email.value,
      password: this.confirmPassword.value
    }

    this.createUser.registerUser(this.userDetails).subscribe((response) => {
      console.log("Response post: ", response);
      if (response.status == 201) {
        this.openToast("User Creation Successful!");
      }

    });
    console.log("hello")
  }

  openToast(message:any) { 
    this._snackBar.open(message, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    });
  }

  ngOnInit(): void {
  }

}
