import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';

declare var Swal: any;

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<IUser | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.iduser;
      try {
        const userData = await this.usersService.getById(id);
        this.user.set(userData);
      } catch (error) {
        console.error({ "error": "No se ha podido recuperar el usuario" });
        Swal.fire('Error', 'No se ha podido recuperar el usuario', 'error');
      }
    });
  }

  async borrarUsuario() {
    const currentUser = this.user();
    if (currentUser && currentUser._id) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar a ${currentUser.first_name}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          try {
            await this.usersService.delete(currentUser._id!);
            Swal.fire({
              title: '¡Borrado!',
              text: 'El usuario ha sido eliminado.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });

            this.router.navigate(['/home']);
          } catch (error) {

            console.error({ "error": "El usuario que intentas borrar no existe" });

            Swal.fire({
              title: 'Error al borrar',
              text: 'El usuario que intentas borrar no existe',
              icon: 'error'
            });
          }
        }
      });
    }
  }
}