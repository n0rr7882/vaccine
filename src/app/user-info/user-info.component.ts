import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPost, IUser } from '../vaccine.interface';
import { API_URL, POSTS_LIMIT, UserService, SignService, PostService, FollowService } from '../vaccine.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  isEdit: boolean;
  posts: IPost[];
  user: IUser;
  postsOffset: number;
  postCount: number;
  followLoading: boolean;
  updateLoading: boolean;

  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.pattern(/^(?=.*).{2,20}$/)),
    email: new FormControl('', Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)),
    password: new FormControl('', Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/))
  });

  uploader: FileUploader;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private signService: SignService,
    private followService: FollowService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.route.params.subscribe(async params => {

      this.isEdit = false;
      this.postsOffset = 0;
      this.posts = [];
      this.user = null;
      this.postCount = 0;
      this.followLoading = false;
      this.updateLoading = false;
      this.uploader = new FileUploader({
        url: `${API_URL}/uploads/thumbnail`,
        authToken: await this.signService.getToken()
      });
      this.uploader.onBeforeUploadItem = item => {
        item.withCredentials = false;
      };
      this.uploader.onCompleteAll = () => {
        this.toastrService.success('썸네일 변경 완료');
      };

      try {

        await this.signService.loadMe();
        await this.loadUser();
        await this.readMorePosts();

      } catch (err) {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR');
        } else {
          this.toastrService.error(err.message, 'ERROR');
        }
      }

    });

  }

  public toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  public async loadUser(): Promise<void> {
    this.user = await this.userService.readOne(this.route.snapshot.params['id']);
    this.postCount = await this.postService.count({ by: 'author', q: this.route.snapshot.params['id'] });
  }

  public async readMorePosts(): Promise<void> {
    const posts = await this.postService.read({
      limit: POSTS_LIMIT.toString(),
      offset: this.postsOffset.toString(),
      by: 'author',
      q: this.route.snapshot.params['id'],
      regex: 'false'
    });
    this.posts.push(...posts);
    this.postsOffset += POSTS_LIMIT;
  }

  public async update(): Promise<void> {
    try {

      if (!this.updateForm.valid) {
        throw new Error('폼을 모두 맞춰주세요.');
      }
      this.updateLoading = true;
      const updated = this.updateForm.value;
      const user = await this.userService.update(this.route.snapshot.params['id'], updated);
      await this.loadUser();
      this.toggleEdit();
      this.toastrService.success('업데이트되었습니다.');
      this.updateLoading = false;

    } catch (err) {
      if (err.error) {
        this.toastrService.error(err.error.message, '업데이트 실패');
      } else {
        this.toastrService.error(err.message, '업데이트 실패');
      }
    }

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
    }
  }

  public logout(): void {
    this.signService.logout();
  }

  public get me(): IUser {
    return this.signService.me;
  }

  public thumbnailStyle(id: string): Object {
    return { 'background-image': `url(${this.userService.getThumbnailURL(id)})` };
  }

}
