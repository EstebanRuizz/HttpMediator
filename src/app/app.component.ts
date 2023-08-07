import { Component, OnInit } from '@angular/core';
import { UserDTO } from './UserDTO';
import { CommandParams, HttpMediator } from './HttpMediator';
import { UserCommand } from './UserCommand';
import { UserQuery } from './UserQuery';
import { HttpMediatorCallbacks } from './HttpMediatorCallbacks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class UserCRUDComponent implements OnInit {
  constructor(private httpMediator: HttpMediator) {}
  ngOnInit(): void {
    this.onGetAllUsers()
  }
  
  onCreateUser(): void {
    const createUserDto: CreateUserDTO = { email: 'ana@an.com' };
    const callbacks: HttpMediatorCallbacks<UserDTO> = {
      success: this.onCreateUserSuccess.bind(this),
      error: this.onHttpError.bind(this),
    };

    this.httpMediator.exec({
      commandClass: UserCommand,
      method: UserCommand.prototype.createUser,
      callbacks,
      data: createUserDto,
    });
  }

  onGetAllUsers(): void {
    const callbacks: HttpMediatorCallbacks<UserDTO[]> = {
      success: this.onGetAllUsersSuccess.bind(this),
      error: this.onHttpError.bind(this),
    };

    this.httpMediator.exec({
      commandClass: UserQuery,
      method: UserQuery.prototype.getUsers,
      callbacks,
    });
  }
  onCreateUserSuccess(response: UserDTO) {
    console.log(response, ' AT onCreateUserSuccess ');
  }

  onGetAllUsersSuccess(response: UserDTO[]) {
    console.log(response, ' AT onGetAllUsersSuccess ');
  }

  onHttpError(error: any) {
    console.log(error);
  }
}

export interface CreateUserDTO {
  email: string;
}
export interface UpdateUserDTO { }
