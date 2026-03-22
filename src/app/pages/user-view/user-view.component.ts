import { Component, inject, OnInit, signal } from '@angular/core';
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

  user = signal<IUser | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.iduser;
      try {
        const userData = await this.usersService.getById(id);
        this.user.set(userData);
        console.log('Datos del usuario capturados', this.user());
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }

  async borrarUsuario() {
    const currentUser = this.user();

    if (currentUser && currentUser._id) {
      const seguro = confirm(`¿Estás seguro de que quieres eliminar a ${currentUser.first_name}?`);
      if (seguro) {
        try {
          await this.usersService.delete(currentUser._id);
          alert('AppUsers: Usuario eliminado con éxito');
          this.router.navigate(['/home']);
        } catch (error) {
          console.error('Error al borrar:', error);
        }
      }
    }
  }
}





