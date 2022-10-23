import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserUpdateService } from '../services/user-update.service';
import { FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-form-component',
  templateUrl: './edit-form-component.component.html',
  styleUrls: ['./edit-form-component.component.css']
})
export class EditFormComponentComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public username = new FormControl('', [Validators.required]);

  public selectedUserValues: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private userService: UserUpdateService, private _snackBar: MatSnackBar) { }



  loadUploadData() { 
    let id = this.data.userid;
    this.selectedUserValues = this.data.users.filter((element: any) => element.id == id);
    this.email.setValue(this.selectedUserValues[0].email);
    this.username.setValue(this.selectedUserValues[0].first_name);
  }

  updateUserDetails() { 
    let updated = {
      name: this.username.value,
      email: this.email.value
    }
    console.log("user update ser: ", updated);
    this.userService.UpdateUser(this.data.userid, updated).subscribe((response) => {
      console.log("response: ", response);
      this.openToast();
    });
  }

  openToast() { 
    this._snackBar.open('Successfully updated!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    });
  }

  ngOnInit(): void {
    this.loadUploadData();
   
  }

}
