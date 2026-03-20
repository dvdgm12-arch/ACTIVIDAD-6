import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  titulo: string = "Registro de Usuario";

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.siduser) {
        this.titulo = "Actualización de Usuario";
      }
    });
  }

// objeto vinculante a formulario
// ReactiveForms


  async getDataForm(pForm: any) {
    //await
    //response
    console.log('Enviado datos al servicio...');
  }
}
