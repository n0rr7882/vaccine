import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { RegisterComponent } from './register/register.component';

import { SignGuard } from './sign.guard';

const routes: Routes = [
    { path: '', redirectTo: 't', pathMatch: 'full' },
    { path: 't', component: TimelineComponent, canActivate: [SignGuard] },
    { path: 'f', component: FollowsComponent, canActivate: [SignGuard] },
    { path: 'u/:id', component: UserInfoComponent, canActivate: [SignGuard] },
    { path: 'sign', component: RegisterComponent },
    { path: '**', redirectTo: 't' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class VaccineRoutesModule { }
