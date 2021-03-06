import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowsComponent } from './follows/follows.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { VaccineRoutesModule } from './vaccine-routes.module';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { PostCardComponent } from './post-card/post-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { CommentsComponent } from './comments/comments.component';
import { HashtagsComponent } from './hashtags/hashtags.component';

import { TimeAgoPipe } from 'time-ago-pipe';

import {
  SignService,
  UserService,
  PostService,
  CommentService,
  FollowService,
  MypageService,
  LikeService,
  SearchService
} from './vaccine.service';

import { CookieService } from 'ngx-cookie-service';
import { SignGuard } from './sign.guard';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    FollowsComponent,
    SearchComponent,
    UserInfoComponent,
    NavComponent,
    RegisterComponent,
    PostCardComponent,
    UserCardComponent,
    CommentsComponent,
    HashtagsComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    VaccineRoutesModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    FileUploadModule,
  ],
  providers: [
    CookieService,
    SignService,
    UserService,
    PostService,
    CommentService,
    FollowService,
    MypageService,
    LikeService,
    SearchService,
    SignGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
