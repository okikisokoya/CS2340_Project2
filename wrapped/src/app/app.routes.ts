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
import { DuointroComponent } from './duointro/duointro.component';
import { DuotopgenresComponent } from './duotopgenres/duotopgenres.component';
import { DuominigameComponent } from './duominigame/duominigame.component';
import { DuotopartistsComponent } from './duotopartists/duotopartists.component';
import { DuotopsongsComponent } from './duotopsongs/duotopsongs.component';
import { DuototalpointsComponent } from './duototalpoints/duototalpoints.component';
import { JediComponent } from './jedi/jedi.component';
import { SithComponent } from './sith/sith.component';
import { NeutralComponent } from './neutral/neutral.component';
import { AuthorsComponent } from './authors/authors.component';



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
  { path: 'top-artists', component: TopArtistsComponent }, 
  { path: 'top-songs', component: TopSongsComponent }, 
  { path: 'listening-time', component: ListeningTimeComponent }, 
  { path: 'listeningmood', component: ListeningmoodComponent }, 
  { path: 'mostsurprising', component: MostsurprisingComponent },
  { path: 'duointro', component: DuointroComponent },
  { path: 'duotopgenres', component: DuotopgenresComponent },
  { path: 'duominigame', component: DuominigameComponent },
  { path: 'duotopartists', component: DuotopartistsComponent },
  { path: 'duotopsongs', component: DuotopsongsComponent },
  { path: 'duototalpoints', component: DuototalpointsComponent },
  { path: 'jedi', component: JediComponent },
  { path: 'sith', component: SithComponent },
  { path: 'neutral', component: NeutralComponent },
  {path: "authors", component: AuthorsComponent}
  
];
