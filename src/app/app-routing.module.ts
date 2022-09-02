import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/init/app.guard';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { FornitoreComponent } from './Components/fornitore/fornitore.component';
import { ProdottoComponent } from './Components/prodotto/prodotto.component';
import { OrdineComponent } from './Components/ordine/ordine.component';
import { FattureFornitoreComponent } from './Components/fatture-fornitore/fatture-fornitore.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent, canActivate:[AuthGuard]},
  {path:'fornitori', component:FornitoreComponent, canActivate:[AuthGuard]},
  {path:'prodotti', component:ProdottoComponent, canActivate:[AuthGuard]},
  {path:'ordini', component:OrdineComponent, canActivate: [AuthGuard]},
  {path:'fatture-fornitori', component: FattureFornitoreComponent, canActivate:[AuthGuard]},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
