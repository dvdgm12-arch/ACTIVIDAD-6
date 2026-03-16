import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: UserListComponent},
    { path: 'user/:iduser', component: UserViewComponent},
    { path: 'newuser', component: UserFormComponent },
    { path: 'updateuser/:iduser', component: UserFormComponent },
    { path: '**', redirectTo: 'home' }
];
