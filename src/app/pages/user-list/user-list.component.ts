import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { IUser, IUserResponse } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);

  arrUsers: IUser[] = [];

  async ngOnInit() {
    try {
      const response: IUserResponse = await this.usersService.getAll();
      
      if (response && response.results) {
        this.arrUsers = [...response.results]; 
        
        this.cdr.detectChanges(); 
        
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
        
        this.arrUsers = this.arrUsers.filter(user => user._id !== id);
        
        alert('Usuario eliminado (Simulado)');
      } catch (error) {
        console.error('Error al borrar:', error);
      }
    }
  }
}
