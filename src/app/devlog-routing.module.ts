import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { MypageComponent } from './mypage/mypage.component';

const routes: Routes = [
    { path: '', redirectTo: 'timeline', pathMatch: 'full' },
    { path: 'timeline', component: TimelineComponent },
    { path: 'follows', component: FollowsComponent },
    { path: 'search', component: SearchComponent },
    { path: 'mypage', component: MypageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DevlogRoutingModule { }