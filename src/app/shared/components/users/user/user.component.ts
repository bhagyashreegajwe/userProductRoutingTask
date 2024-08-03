import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId !: string
  userObj !:Iuser
  constructor(
    private _routes : ActivatedRoute,
    private _userService : UsersService
  ) { }

  ngOnInit(): void {
    this.userId = this._routes.snapshot.params['userId'];
    if(this.userId){
      this.userObj = this._userService.getUser(this.userId)!
    }
  }

  removeUser(id:string){
    let getConfirm = confirm('Are you sure to remove the user?');
    if(getConfirm){
      this._userService.removeUser(id)
    }
  }

}
