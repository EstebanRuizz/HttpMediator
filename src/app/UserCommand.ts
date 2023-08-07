import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateUserDTO, UpdateUserDTO } from "./app.component";
import { UserDTO } from "./UserDTO";


@Injectable()
export class UserCommand {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4200/user';
    
  createUser(createUserDto: CreateUserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.url, createUserDto);
  }
}
