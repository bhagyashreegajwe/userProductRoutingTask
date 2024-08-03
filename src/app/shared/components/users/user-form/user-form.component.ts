import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm! : FormGroup
  isInEditMode : boolean = false
  userId !:string
  userObj!:Iuser
  constructor(
    private _userService : UsersService,
    private _uuidService : UuidService,
    private _routes: ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.userId = this._routes.snapshot.params['userId'];
    if(this.userId){
      this.isInEditMode = true
      this.userObj = this._userService.getUser(this.userId)!
      this.userForm.patchValue(this.userObj)
    }else{
      this.isInEditMode = false
    }
  }

  createUserForm(){
    this.userForm = new FormGroup({
      userFirstName : new FormControl(null, [Validators.required]),
      userLastName : new FormControl(null, [Validators.required]),
      userContact : new FormControl(null, [Validators.required]),
      userEmail : new FormControl(null, [Validators.required]),
    })
  }
  
  onAddUser(){
    if(this.userForm.valid){
      let newUser = {...this.userForm.getRawValue(), pid:this._uuidService.uuid()}
      this._userService.addNewUser(newUser)
    }
  }

  onEditUser(){
    if(this.userForm.valid){
      let updateObj = {...this.userForm.value, userId:this.userId}
      console.log(updateObj)
      this._userService.updateUser(updateObj)
    }
  }

  goToUsers(){
    this._router.navigate(['users'])
  }

}
