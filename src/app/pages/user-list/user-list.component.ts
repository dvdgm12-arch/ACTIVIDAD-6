import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { IUser, IUserResponse } from '../../interfaces/user.interface';

declare var Swal: any;

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
        console.log('¡Usuarios cargados con éxito!', this.arrUsers());
        console.table(this.arrUsers());
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  }

  async borrarUsuario(id: string, nombre: string) {
    Swal.fire({
      title: 'Atención',
      text: `¿Deseas eliminar a ${nombre} del listado?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await this.usersService.delete(id);

          this.arrUsers.update(users => users.filter(user => user._id !== id));

          Swal.fire({
            title: 'AppUsers',
            text: 'Usuario eliminado del HUB',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire('Error', 'El servidor no respondió correctamente', 'error');
        }
      }
    });
  }
}
