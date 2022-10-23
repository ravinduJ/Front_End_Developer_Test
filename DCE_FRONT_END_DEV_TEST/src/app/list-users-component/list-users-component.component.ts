import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ListUsersService } from '../services/list-users.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponentComponent } from '../edit-form-component/edit-form-component.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-users-component',
  templateUrl: './list-users-component.component.html',
  styleUrls: ['./list-users-component.component.css']
})
export class ListUsersComponentComponent implements OnInit {

  public users: any;
  public dataSource: any;
  public displayedColumns: any;
  public pageEvent: PageEvent | any;
  

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private userServices: ListUsersService, public dialog: MatDialog,  private _snackBar: MatSnackBar) {}



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      this.getusers();
    }
  }

  getusers(event?:PageEvent) { 
    this.userServices.getUserList(event?.pageIndex, event?.pageSize).subscribe((response) => {
      this.users = response;
      this.dataSource = new MatTableDataSource(this.users.data);
    });
    this.displayedColumns = ['id', 'first_name', 'last_name', 'email', 'avatar', 'edit', 'delete'];
  } 

  deleteUser(userid : any) { 

    console.log("userId (Delete) : ", userid);
    this.userServices.deleteUser(userid).subscribe((response) => { 
      this.openToast("Successfully Deleted!");
    });

  }
// open update form
  openDialog(id: any) {
    const dialogRef = this.dialog.open(EditFormComponentComponent, {
      data: {
        users: this.users.data,
        userid: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
// Toast
  openToast(message:any) { 
    this._snackBar.open(message, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    });
  }

  ngAfterViewInit() { 
    this.getusers();
  }

  ngOnInit(): void {

  
    this.getusers();

  }

}
