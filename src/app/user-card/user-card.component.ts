import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../vaccine.interface';
import { FollowService, UserService, SignService } from '../vaccine.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: IUser;
  followLoading: boolean;

  constructor(
    private followService: FollowService,
    private userService: UserService,
    private signService: SignService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  public async loadUser(): Promise<void> {
    this.user = await this.userService.readOne(this.user._id);
  }

  public async follow(): Promise<void> {
    try {

      this.followLoading = true;
      await this.followService.follow(this.user._id);
      await this.loadUser();
      this.followLoading = false;

    } catch (err) {
      if (err.error) {
        this.toastrService.error(err.error.message, '팔로우 실패');
      } else {
        this.toastrService.error(err.message, '팔로우 실패');
      }
      this.followLoading = false;
    }
  }

  public async unfollow(): Promise<void> {
    try {

      this.followLoading = true;
      await this.followService.unfollow(this.user._id);
      await this.loadUser();
      this.followLoading = false;

    } catch (err) {
      if (err.error) {
        this.toastrService.error(err.error.message, '언팔로우 실패');
      } else {
        this.toastrService.error(err.message, '언팔로우 실패');
      }
      this.followLoading = false;
    }
  }

  public get me(): IUser {
    return this.signService.me;
  }

  public thumbnailStyle(id: string): Object {
    return { 'background-image': `url(${this.userService.getThumbnailURL(id)})` };
  }

}
