import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { IUser, IUserResponse } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);

  arrUsers = signal<IUser[]>([]);

  async ngOnInit() {
    try {
      const response: IUserResponse = await this.usersService.getAll();
      
      if (response && response.results) {
        this.arrUsers.set(response.results);
        console.log('¡Usuarios cargados con éxito!', this.arrUsers.length);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  }

  async borrarUsuario(id: string, nombre: string) {
    if (confirm(`¿Seguro que quieres borrar a ${nombre}?`)) {
      try {
        await this.usersService.delete(id);
        
        this.arrUsers.update(users => users.filter(user => user._id !== id));
        
        alert('Usuario eliminado (Simulado)');
      } catch (error) {
        console.error('Error al borrar:', error);
      }
    }
  }
}
