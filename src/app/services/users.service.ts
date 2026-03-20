import { Injectable } from "@angular/core";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../interfaces/user.interface";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: "root",
})

export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://peticiones.online/api/users';

  // OBTENER TODOS LOS USUARIOS (GET)
  getAll(): Promise<IUser[]> {
    return firstValueFrom(this.httpClient.get<IUser[]>(this.baseUrl));
  }

  // CREAR UN USUARIO (POST)
  create(user: IUser): Promise<IUser> {
    return firstValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }

  // ACTUALIZAR UN USUARIO (PUT)
  update(id: number, user: IUser): Promise<IUser> {
    return firstValueFrom(this.httpClient.put<IUser>(`${ this.baseUrl }/$ { id }`, user)); // USAMOS USER ID PARA RUTA DINAMICA
  }
}



  
  