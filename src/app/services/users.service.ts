import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { IUser, IUserResponse } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';

 
   getAll(): Promise<IUserResponse> {
    return firstValueFrom(this.httpClient.get<IUserResponse>(this.baseUrl));
  }

  async getById(id: string): Promise<IUser> {
    return firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  create(user: IUser): Promise<IUser> {
    return firstValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }

  update(user: IUser): Promise<IUser> {
    return firstValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${user.id}`, user));
  }

  async delete(id: string): Promise<IUser> {
    return firstValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`));
  }
}


  
  