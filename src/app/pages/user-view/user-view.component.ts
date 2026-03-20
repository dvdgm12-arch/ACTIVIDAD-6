import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';

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
  private cdr = inject(ChangeDetectorRef);

  user!: IUser;

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.iduser;
      this.user = await this.usersService.getById(id);

      try {
        this.user = await this.usersService.getById(id);

        this.cdr.detectChanges();

        console.log('Datos del usuario capturados', this.user);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }

  async borrarUsuario() {
    if (this.user && this.user._id) {

      const seguro = confirm(`¿Estás seguro de que quieres eliminar a ${this.user.first_name}?`);

      if (seguro) {
        try {
          await this.usersService.delete(this.user._id);

          alert('Usuario eliminado con éxito');
          this.router.navigate(['/home']);

        } catch (error) {
          console.error('Error al borrar:', error);
          alert('Hubo un error al intentar eliminar el usuario');
        }
      }
    }
  }
}




