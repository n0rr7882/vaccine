import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public isEditing: boolean;
  public deleteLoading: boolean;
  public updateLoading: boolean;
  public likeLoading: boolean;

  public updateForm: FormGroup;

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
    this.isEditing = false;
    this.deleteLoading = false;
    this.updateLoading = false;
    this.likeLoading = false;
    this.updateForm = new FormGroup({
      content: new FormControl(this.post.content, Validators.required)
    });

    this.getMyActions();
  }

  public get ico(): boolean { return this.isCommentOpen; }
  public set ico(state: boolean) { this.isCommentOpen = state; }

  public toggleComments() {
    this.isCommentOpen = !this.isCommentOpen;
    this.reloadPost();
  }

  public toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  public getMyActions() {
    if (this.post.goods.includes(this.signService.me._id)) {
      return 'activated-like';
    } else {
      return undefined;
    }
  }

  public like() {

    if (!this.likeLoading) {

      this.likeLoading = true;

      this.likeService.like(this.post._id)
        .then(() => {
          this.reloadPost();
          this.likeLoading = false;
        })
        .catch(err => {
          this.likeLoading = false;
          if (err.error) {
            this.toastrService.error(err.error.message, '좋아요 중 에러');
          } else {
            this.toastrService.error(err.message, '좋아요 중 에러');
          }
        });

    }

  }

  public unlike() {

    if (!this.likeLoading) {

      this.likeLoading = true;

      this.likeService.unlike(this.post._id)
        .then(() => {
          this.reloadPost();
          this.likeLoading = false;
        })
        .catch(err => {
          this.likeLoading = false;
          if (err.error) {
            this.toastrService.error(err.error.message, '좋아요 취소 중 에러');
          } else {
            this.toastrService.error(err.message, '좋아요 취소 중 에러');
          }
        });

    }

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

  public updatePost(): void {

    Promise.resolve()
      .then(() => {
        if (this.updateForm.valid) {
          return this.updateForm.value;
        }
        throw new Error('나의 소식을 적어주세요!');
      })
      .then(data => {
        this.updateLoading = true;
        return this.postService.update(this.post._id, data);
      })
      .then(post => {
        this.post = post;
        this.updateForm.setValue({ content: this.post.content });
        this.toastrService.success('수정 완료');
        this.toggleEdit();
        this.updateLoading = false;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '업로드 실패');
        } else {
          this.toastrService.error(err.message, '업로드 실패');
        }
        this.updateLoading = false;
      });

  }

  public deletePost(): void {

    this.deleteLoading = true;

    this.postService.delete(this.post._id)
      .then(post => {
        this.isDeleted = true;
        this.deleteLoading = false;
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

}
