import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { FornitoreComponent } from './Components/fornitore/fornitore.component';
import { ProdottoComponent } from './Components/prodotto/prodotto.component';
import { OrdineComponent } from './Components/ordine/ordine.component';
import { FattureFornitoreComponent } from './Components/fatture-fornitore/fatture-fornitore.component';
import { AuthGuard } from 'src/init/my_auth/app.guard';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { RefreshTokenComponent } from './Components/refresh-token/refresh-token.component';
import { RegistrazioneComponent } from './Components/registrazione/registrazione.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'fornitori', component:FornitoreComponent, canActivate:[AuthGuard], data:{roles:['admin']}},
  {path:'prodotti', component:ProdottoComponent, canActivate:[AuthGuard], data:{roles:['admin']}},
  {path:'ordini', component:OrdineComponent, canActivate: [AuthGuard], data:{roles:['admin']}},
  {path:'fatture-fornitori', component: FattureFornitoreComponent, canActivate:[AuthGuard], data:{roles:['admin']}},
  {path:'access-denied', component:AccessDeniedComponent},
  {path:'registrazione', component:RegistrazioneComponent},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
