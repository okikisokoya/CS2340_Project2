import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  
import { LandingComponent } from './landing/landing.component'; 
import { ForgotpassComponent } from './forgotpass/forgotpass.component'; 
import { InvitefriendComponent } from './invitefriend/invitefriend.component';
import { SavedwrapsComponent } from './savedwraps/savedwraps.component';
import { DeleteaccComponent } from './deleteacc/deleteacc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { AccdeletedComponent } from './accdeleted/accdeleted.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { IntroComponent } from './intro/intro.component';
import { TopgenresComponent } from './topgenres/topgenres.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { TopSongsComponent } from './top-songs/top-songs.component';
import { ListeningTimeComponent } from './listening-time/listening-time.component';
import { ListeningmoodComponent } from './listeningmood/listeningmood.component';
import { MostsurprisingComponent } from './mostsurprising/mostsurprising.component';
import { OutroComponent } from './outro/outro.component';



export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'deleteacc', component: DeleteaccComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'invitefriend', component: InvitefriendComponent },
  { path: 'savedwraps', component: SavedwrapsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loggedout', component: LoggedOutComponent },
  { path: 'accdeleted', component: AccdeletedComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'settings', component: UsersettingsComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'topgenres', component: TopgenresComponent }, 
  { path: 'topartists', component: TopArtistsComponent }, 
  { path: 'topsongs', component: TopSongsComponent }, 
  { path: 'listeningtime', component: ListeningTimeComponent }, 
  { path: 'listeningmood', component: ListeningmoodComponent }, 
  { path: 'mostsurprising', component: MostsurprisingComponent },
  { path: 'outro', component: OutroComponent },
  
];
