import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userFirstName', 'userLastName', 'userContact', 'userEmail', 'userId'];
  allUsers!:Array<Iuser>
  constructor(
    private _userService : UsersService
  ) { }

  ngOnInit(): void {
    this.allUsers = this._userService.fetchAllUsers()
  }

}
