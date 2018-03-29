import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
    { path: '', redirectTo: 't', pathMatch: 'full' },
    { path: 't', component: TimelineComponent },
    { path: 'f', component: FollowsComponent },
    { path: 'u/:id', component: UserInfoComponent },
    { path: '**', redirectTo: 't' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class VaccineRoutingModule { }
