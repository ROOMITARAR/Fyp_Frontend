import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignLoginComponent } from './sign-login/sign-login.component';
import { StuLoginComponent } from './student/stu-login/stu-login.component';
import { StuSignupComponent } from './student/stu-signup/stu-signup.component';
import { DoLoginComponent } from './donor/do-login/do-login.component';
import { DoSignupComponent } from './donor/do-signup/do-signup.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { DonorsComponent } from './donors/donors.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { FundrequestComponent } from './fundrequest/fundrequest.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminComponent } from './admins/admin/admin.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'sign-login',
    component: SignLoginComponent
  },
  {
    path: 'stu-login',
    component: StuLoginComponent
  },
  {
    path: 'stu-signup',
    component: StuSignupComponent
  },
  {
    path: 'do-login',
    component: DoLoginComponent
  },
  {
    path: 'do-signup',
    component: DoSignupComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'donors',
    component: DonorsComponent
  },
  {
    path: 'about-us',
    component:AboutUsComponent
  },
  {
    path: 'contact-us',
    component:  ContactUsComponent
  },
  {
    path: 'donate-now',
    component: DonateNowComponent
  }, 
  {
    path: 'admin-login',
    component: AdminComponent
  },
  {
    path: 'fundrequest',
    component: FundrequestComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
