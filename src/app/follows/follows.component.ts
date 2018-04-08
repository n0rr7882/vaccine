import { Component, OnInit } from '@angular/core';
import { USERS_LIMIT, MypageService, FollowService } from '../vaccine.service';
import { IUser } from '../vaccine.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {

  followings: IUser[] = [];
  followers: IUser[] = [];

  followingsOffset: number;
  followersOffset: number;

  followingsLoading: boolean;
  followersLoading: boolean;

  constructor(
    private mypageService: MypageService,
    private followService: FollowService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.followersLoading = false;
    this.followingsLoading = false;
    this.followersOffset = 0;
    this.followingsOffset = 0;
    this.loadMoreFollowers();
    this.loadMoreFollowings();
  }

  loadMoreFollowings() {

    Promise.resolve()
      .then(() => {
        this.followingsLoading = true;
        const params = {
          limit: USERS_LIMIT.toString(),
          offset: this.followingsOffset.toString(),
          type: 'followers'
        };
        return this.mypageService.getFollows(params);
      })
      .then(users => {
        this.followings.push(...users);
        this.followingsLoading = false;
        this.followingsOffset += USERS_LIMIT;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
        this.followingsLoading = false;
      });

  }

  loadMoreFollowers() {

    Promise.resolve()
      .then(() => {
        this.followersLoading = true;
        const params = {
          limit: USERS_LIMIT.toString(),
          offset: this.followersOffset.toString(),
          type: 'followings'
        };
        return this.mypageService.getFollows(params);
      })
      .then(users => {
        this.followers.push(...users);
        this.followersLoading = false;
        this.followersOffset += USERS_LIMIT;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
        this.followersLoading = false;
      });

  }

}
