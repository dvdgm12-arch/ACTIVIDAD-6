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

@Injectable({
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
}

