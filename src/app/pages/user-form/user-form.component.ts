import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

declare var Swal: any;

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;
  isUpdate: boolean = false;

  constructor() {

    this.userForm = new FormGroup({
      _id: new FormControl(''),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['iduser'];
    if (id) {
      this.isUpdate = true;
      try {
        const user = await this.usersService.getById(id);

        this.userForm.patchValue(user);
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    }
  }

  async onSubmit() {
    if (this.isUpdate) {
      await this.usersService.update(this.userForm.value);
      Swal.fire({
        title: '¡Actualizado!',
        text: 'El usuario ha sido modificado con éxito',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
      }).then(() => {
        this.router.navigate(['/home']); // Navegamos también al actualizar
      });

    } else {
      await this.usersService.create(this.userForm.value);
      Swal.fire({
        title: '¡Registrado!',
        text: 'Usuario creado correctamente en el HUB',
        icon: 'success',
        confirmButtonColor: '#198754'
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}