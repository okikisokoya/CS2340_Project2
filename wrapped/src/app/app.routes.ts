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
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { TopSongsComponent } from './top-songs/top-songs.component';
import { DuointroComponent } from './duointro/duointro.component';
import { DuotopartistsComponent } from './duotopartists/duotopartists.component';
import { DuotopsongsComponent } from './duotopsongs/duotopsongs.component';
import { DuototalpointsComponent } from './duototalpoints/duototalpoints.component';
import { JediComponent } from './jedi/jedi.component';
import { SithComponent } from './sith/sith.component';
import { NeutralComponent } from './neutral/neutral.component';
import { AuthorsComponent } from './authors/authors.component';
import { OutroComponent } from './outro/outro.component';
import { BattleRecapComponent } from './battle-recap/battle-recap.component';
import { SongsIntroComponent } from './songs-intro/songs-intro.component';
import { AudioIntroComponent } from './audio-intro/audio-intro.component';
import { AudioComponent } from './audio/audio.component';
import { DuoBattleRecapComponent } from './duo-battle-recap/duo-battle-recap.component';
import { DuoSongsIntroComponent } from './duo-songs-intro/duo-songs-intro.component';
import { DuoAudioComponent } from './duo-audio/duo-audio.component';
import { LoadingComponent } from './loading/loading.component';


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
  { path: 'top-artists', component: TopArtistsComponent }, 
  { path: 'top-songs', component: TopSongsComponent }, 
  { path: 'duointro', component: DuointroComponent },
  { path: 'duotopartists', component: DuotopartistsComponent },
  { path: 'duotopsongs', component: DuotopsongsComponent },
  { path: 'duototalpoints', component: DuototalpointsComponent },
  { path: 'jedi', component: JediComponent },
  { path: 'sith', component: SithComponent },
  { path: 'neutral', component: NeutralComponent },
  {path: "authors", component: AuthorsComponent},
  {path: "outro", component: OutroComponent},
  {path: "battle-recap", component: BattleRecapComponent},
  {path: "songs-intro", component: SongsIntroComponent},
  {path: "audio-intro", component: AudioIntroComponent},
  {path: "audio", component: AudioComponent},
  {path: "duobattlerecap", component: DuoBattleRecapComponent},
  {path: "duosongsintro", component: DuoSongsIntroComponent},
  {path: "duoaudio", component: DuoAudioComponent},
  {path: "loading", component: LoadingComponent},
];
