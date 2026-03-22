import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

declare var Swal: any;

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  private usersService = inject(UsersService);

  async onBorrarClick() {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `¿Seguro que quieres borrar a ${this.myUser.first_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await this.usersService.delete(this.myUser._id!);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Usuario borrado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  }
}
