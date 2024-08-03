import { Injectable } from '@angular/core';
import { Iuser } from '../models/user.interface';
import { users } from '../const/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  allUsers: Array<Iuser> = users
  constructor(
    private _router: Router
  ) { }

  fetchAllUsers(){
    return this.allUsers
  }

  addNewUser(newObj: Iuser){
    this.allUsers.push(newObj)
    this._router.navigate(['users'])
  }

  getUser(id:string){
    return this.allUsers.find(user => user.userId === id)
  }

  updateUser(updateObj: Iuser){
    let getIndex = this.allUsers.findIndex(users => users.userId === updateObj.userId);
    this.allUsers[getIndex] = updateObj
    this._router.navigate(['users'])
  }

  removeUser(id:string){
    let getIndex = this.allUsers.findIndex(user => user.userId === id);
    this.allUsers.splice(getIndex,1);
    this._router.navigate(['users'])
  }
}
