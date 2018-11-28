import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExistsComponent } from './exists/exists.component';
 import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from './pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    ExistsComponent,
    HomeComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
     RouterModule.forRoot([
        {
        path: 'exists',
        component: ExistsComponent
      },
      {
        path: 'pagination',
        component: PaginationComponent
      },
	 {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
