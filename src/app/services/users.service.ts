import { HttpClient } from '@angular/common/http';

export class UsersService {
    private baseUrl: string = 'https://peticiones.online/users';

    constructor(private http: HttpClient) { }

    getAll() { // GET /users }
    getById(id: string) { /*GET /users/id */ }
    insert(user: User) { /* POST /users */ }
    update(user: User) { /* PUT /users/id */ }
    delete(id: string) { /* DELETE /users/id */ }
}
