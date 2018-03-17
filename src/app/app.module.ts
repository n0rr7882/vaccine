import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { MypageComponent } from './mypage/mypage.component';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { PostCardComponent } from './post-card/post-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    FollowsComponent,
    SearchComponent,
    MypageComponent,
    NavComponent,
    RegisterComponent,
    PostCardComponent,
    UserCardComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    VaccineRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
