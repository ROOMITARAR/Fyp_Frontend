import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SignLoginComponent } from './sign-login/sign-login.component';
import { StuLoginComponent } from './student/stu-login/stu-login.component';
import { StuSignupComponent } from './student/stu-signup/stu-signup.component';
import { DoLoginComponent } from './donor/do-login/do-login.component';
import { DoSignupComponent } from './donor/do-signup/do-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { HomeComponentComponent } from './homecomponent/home-component/home-component.component';
import {SecHomeComponent} from  './homecomponent/sec-home/sec-home.component';
import { ThirdHomeComponent } from './homecomponent/third-home/third-home.component';
import { StudentsComponent } from './students/students.component';
import { DonorsComponent } from './donors/donors.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForthHomeComponent } from './homecomponent/forth-home/forth-home.component';
import { AdminComponent } from './admins/admin/admin.component';
import { FundrequestComponent } from './fundrequest/fundrequest.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignLoginComponent,
    StuLoginComponent,
    StuSignupComponent,
    DoLoginComponent,
    DoSignupComponent,
    HomeComponent,
   
    HomeComponentComponent,
     SecHomeComponent,
     ThirdHomeComponent,
     StudentsComponent,
     DonorsComponent,
     ContactUsComponent,
     AboutUsComponent,
     DonateNowComponent,
     NotfoundComponent,
     ForthHomeComponent,
     AdminComponent,
     FundrequestComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,  
    
  ],
  providers: [],
 

  bootstrap: [AppComponent]
})
export class AppModule { }
