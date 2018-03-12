import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { MypageComponent } from './mypage/mypage.component';

import { DevlogRoutingModule } from './devlog-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    FollowsComponent,
    SearchComponent,
    MypageComponent
  ],
  imports: [
    BrowserModule,
    DevlogRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
