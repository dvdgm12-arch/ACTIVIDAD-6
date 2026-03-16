import { HttpClient } from '@angular/common/http';

/*
export class UsersService {
    private baseUrl: string = 'https://peticiones.online/api/users';

    constructor(private http: HttpClient) { }

    getAll() { // GET /users }
    /*getById(id: string) { /*GET /users/id */ }
     /*insert(user: User) { /* POST /users */ }
    /* update(user: User) { /* PUT /users/id */ }
     /*delete(id: string) { /* DELETE /users/id */ }
//}

/*@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private htttpClient = inject(HttpClient);
    private baseUrl: string = 'https://peticiones.online/api/users';

    constructor() {
    }

    // DEVOLV TODOS LOS USUARIOS
    getAll() {
        console.log('Llamando a getall...');
    }

    // DEVOLV USUARIO POR ID
    getById(id: string) {
        console.log('Llamando a getById con id...');
    }

    //BORRAR USUARIO
    delete(id: string) {
        console.log('Borrando usuario...');
    }
}*/

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';

  // Devolvemos Observables directamente
  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  insert(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${user._id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}

// En el componente
users = signal<User[]>([]); // Creamos una Signal

async ngOnInit() {
  // Llamamos al servicio y actualizamos la Signal
  this.usersService.getAll().subscribe((data: any) => {
    this.users.set(data.results); // 'set' actualiza el valor y la pantalla reacciona
  });
}

// En el componente
users = signal<User[]>([]); // Creamos una Signal

async ngOnInit() {
  // Llamamos al servicio y actualizamos la Signal
  this.usersService.getAll().subscribe((data: any) => {
    this.users.set(data.results); // 'set' actualiza el valor y la pantalla reacciona
  });
}