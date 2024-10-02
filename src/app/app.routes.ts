import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateRepairComponent } from './repairViews/create-repair/create-repair.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupFormComponent},
    {path: 'editUser', component: EditUserComponent},
    {path: 'addRepair', component: CreateRepairComponent},
    {path: '**', component: FileNotFoundComponent}
];
