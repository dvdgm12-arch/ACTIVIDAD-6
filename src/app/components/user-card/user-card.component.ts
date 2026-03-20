import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

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
    if (confirm(`¿Seguro que quieres borrar a ${this.myUser.first_name}?`)) {
      try {
        await this.usersService.delete(this.myUser._id!);
        alert('Usuario eliminado con éxito');

      } catch (error) {
        console.error(error);
      }
    }
  }
}
