import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDTO } from "./UserDTO";

@Injectable()
export class UserQuery {
  constructor(private http: HttpClient) {}

  url = 'https://api.escuelajs.co/api/v1/products';

  getUsers(): Observable<UserDTO[]> {
    console.log('ENTRO EN UserQuery');
    return this.http.get<UserDTO[]>(this.url);
  }
}
