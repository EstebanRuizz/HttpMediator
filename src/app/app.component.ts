import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';

import { UserDTO } from './UserDTO';
import { UserQuery } from './UserQuery';
import { UserCommand } from './UserCommand';
import { CommandParamsNoPayload, CommandParamsWithPayload, HttpMediator, HttpMediatorCallbacks } from './HttpMediator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private httpMediator: HttpMediator) {}
  
  title = ''
  
  ngOnInit(): void {
    this.onGetAllUsers()
  }
  createUserDto: CreateUserDTO = { email: 'ana@an.com' };
  
  
  onCreateUser(): void {
    const callbacks: HttpMediatorCallbacks<UserDTO> = {
      success: this.onCreateUserSuccess.bind(this),
      error: this.onHttpError.bind(this),
    };
    const params: CommandParamsWithPayload<CreateUserDTO, UserDTO> = {
      commandClass: UserCommand,
      method: UserCommand.prototype.createUser,
      data: this.createUserDto,
      callbacks,
    };
    this.httpMediator.execWithPayload(params);
  }

  onGetAllUsers(): void {
    const callbacks: HttpMediatorCallbacks<UserDTO[]> = {
      success: this.onGetAllUsersSuccess.bind(this),
      error: this.onHttpError.bind(this),
    }; 
    const params: CommandParamsNoPayload<UserDTO[]> = {
      commandClass: UserQuery,
      method: UserQuery.prototype.getUsers,
      callbacks,
    };
    this.httpMediator.execNoPayload(params);
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







// export class UserCRUDComponent implements OnInit {
//   constructor(private httpMediator: HttpMediator) {}
//   ngOnInit(): void {
//     this.onGetAllUsers()
//   }
  
//   onCreateUser(): void {
//     const createUserDto: CreateUserDTO = { email: 'ana@an.com' };
//     const callbacks: HttpMediatorCallbacks<UserDTO> = {
//       success: this.onCreateUserSuccess.bind(this), 
//       error: this.onHttpError.bind(this),
//     };

//     this.httpMediator.exec({
//       commandClass: UserCommand,
//       method: UserCommand.prototype.createUser,
//       callbacks,
//       data: createUserDto,
//     });
//   }

//   onGetAllUsers(): void {
//     const callbacks: HttpMediatorCallbacks<UserDTO[]> = {
//       success: this.onGetAllUsersSuccess.bind(this),
//       error: this.onHttpError.bind(this),
//     };

//     this.httpMediator.exec({
//       commandClass: UserQuery,
//       method: UserQuery.prototype.getUsers,
//       callbacks,
//     });
//   }
//   onCreateUserSuccess(response: UserDTO) {
//     console.log(response, ' AT onCreateUserSuccess ');
//   }

//   onGetAllUsersSuccess(response: UserDTO[]) {
//     console.log(response, ' AT onGetAllUsersSuccess ');
//   }

//   onHttpError(error: any) {
//     console.log(error);
//   }
// }

// export interface CreateUserDTO {
//   email: string;
// }
// export interface UpdateUserDTO { }
