import { Component, OnInit, Input } from '@angular/core';
import { UserService, PostService, SignService, LikeService } from '../vaccine.service';
import { IPost, IUser } from '../vaccine.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  private isCommentOpen: boolean;
  public isLiked: boolean;
  public isDeleted: boolean;
  public deleteLoding: boolean;

  constructor(
    private userService: UserService,
    private signService: SignService,
    private postService: PostService,
    private likeService: LikeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.isCommentOpen = false;
    this.isDeleted = false;
    this.deleteLoding = false;

    this.getMyActions();
  }

  public get ico(): boolean { return this.isCommentOpen; }
  public set ico(state: boolean) { this.isCommentOpen = state; }

  public toggleComments() {
    this.isCommentOpen = !this.isCommentOpen;
    this.reloadPost();
  }

  public getMyActions() {
    if (this.post.goods.includes(this.signService.me._id)) {
      return 'activated-like';
    } else {
      return undefined;
    }
  }

  public like() {

    this.likeService.like(this.post._id)
      .then(() => this.reloadPost())
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '좋아요 중 에러');
        } else {
          this.toastrService.error(err.message, '좋아요 중 에러');
        }
      });

  }

  public unlike() {

    this.likeService.unlike(this.post._id)
      .then(() => this.reloadPost())
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '좋아요 취소 중 에러');
        } else {
          this.toastrService.error(err.message, '좋아요 취소 중 에러');
        }
      });

  }

  public reloadPost() {

    this.postService.readOne(this.post._id)
      .then(post => { this.post = post; })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '포스트 리로드 중 에러');
        } else {
          this.toastrService.error(err.message, '포스트 리로드 중 에러');
        }
      });

  }

  public get me(): IUser {
    return this.signService.me;
  }

  public thumbnailStyle(id: string): Object {
    return { 'background-image': `url(${this.userService.getThumbnailURL(id)})` };
  }

  public deletePost(): void {

    this.deleteLoding = true;

    this.postService.delete(this.post._id)
      .then(post => {
        this.isDeleted = true;
        this.deleteLoding = false;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '포스트 삭제 중 에러');
        } else {
          this.toastrService.error(err.message, '포스트 삭제 중 에러');
        }
      });
  }

  public canIDelete(): boolean {
    if (this.post.author._id === this.me._id) {
      return true;
    } else {
      return false;
    }
  }

  renderHashtags(contents: string): string {
    const hashtagFormat = `<a class="tag" [routerLink]="'/search/$1'">#$1</a>`;
    return contents
      .replace(/(<([^>]+)>)/ig, '')
      .replace(/#([^\s`~!@#$%^&*()+=-]{2,})/g, hashtagFormat);
  }

}
