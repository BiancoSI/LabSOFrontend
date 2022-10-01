import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './Components/login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { FornitoreComponent } from './Components/fornitore/fornitore.component';
import { OrdineComponent } from './Components/ordine/ordine.component';
import { FattureFornitoreComponent } from './Components/fatture-fornitore/fatture-fornitore.component';
import { ProdottoComponent } from './Components/prodotto/prodotto.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DialogComponent } from './Components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogDeleteComponent } from './Components/dialog-delete/dialog-delete.component';
import { DialogOrdineComponent } from './Components/dialog-ordine/dialog-ordine.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogFornituraComponent } from './Components/dialog-fornitura/dialog-fornitura.component';
import { DialogFatturafComponent } from './Components/dialog-fatturaf/dialog-fatturaf.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { initializer } from 'src/init/my_auth/app.init';
import { AuthService } from './Services/AuthService/auth.service';
import { JwtInterceptor } from './Services/RestService/JWT.interceptor';
import { ErrorInterceptor } from './Services/RestService/Error.interceptor';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { RefreshTokenComponent } from './Components/refresh-token/refresh-token.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    FornitoreComponent,
    OrdineComponent,
    FattureFornitoreComponent,
    ProdottoComponent,
    DialogComponent,
    DialogDeleteComponent,
    DialogOrdineComponent,
    DialogFornituraComponent,
    DialogFatturafComponent,
    AccessDeniedComponent,
    RefreshTokenComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
