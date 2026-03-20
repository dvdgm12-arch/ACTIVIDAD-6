import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    if (this.userForm.valid) {
      try {
        if (this.isUpdate) {
          // Lógica de Actualizar (PUT)
          await this.usersService.update(this.userForm.value);
          alert('Usuario actualizado correctamente (Mock)');
        } else {
          // Lógica de Crear (POST)
          await this.usersService.create(this.userForm.value);
          alert('Usuario creado correctamente (Mock)');
        }
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error en la operación:', error);
      }
    }
  }
}