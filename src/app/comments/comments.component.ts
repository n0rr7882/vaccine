import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMENTS_LIMIT, CommentService, MypageService, SignService, UserService } from '../vaccine.service';
import { IPost, IComment, IUser } from '../vaccine.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post: IPost;
  @Output() reload = new EventEmitter<void>();

  private writeLoading: boolean;
  private commentLoading: boolean;
  private commentsOffset: number;
  public comments: IComment[] = [];

  writeForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(
    private commentService: CommentService,
    private signService: SignService,
    private userService: UserService,
    private mypageService: MypageService,
    private toastrService: ToastrService
  ) { }

  public get wl(): boolean { return this.writeLoading; }
  public get cl(): boolean { return this.commentLoading; }

  public set wl(state: boolean) { this.writeLoading = state; }
  public set cl(state: boolean) { this.commentLoading = state; }

  async ngOnInit() {

    this.writeLoading = false;
    this.commentLoading = false;
    this.commentsOffset = 0;
    this.comments = [];

    try {

      await this.readMoreComments();

    } catch (err) {
      if (err.error) {
        this.toastrService.error(err.error.message, '알 수 없는 오류');
      } else {
        this.toastrService.error(err.message, '알 수 없는 오류');
      }
      this.writeLoading = false;
    }

  }

  write() {

    Promise.resolve()
      .then(() => {
        if (this.writeForm.valid) {
          return this.writeForm.value;
        }
        throw new Error('나의 의견을 적어주세요!');
      })
      .then(data => {
        this.writeLoading = true;
        return this.commentService.create(this.post._id, data);
      })
      .then(comment => {
        this.comments.unshift(comment);
        this.writeForm.setValue({ content: '' });
        this.toastrService.success('코멘트 등록 성공');
        this.writeLoading = false;
        this.reload.emit();
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '코멘트 등록 실패');
        } else {
          this.toastrService.error(err.message, '코멘트 등록 실패');
        }
        this.writeLoading = false;
      });

  }

  deleteComment(comment: IComment) {

    this.commentService.delete(comment._id)
      .then(() => {
        this.reload.emit();
        this.comments = this.comments.filter(i => i._id !== comment._id);
        if (this.commentsOffset >= 0) {
          this.commentsOffset -= 1;
        }
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '코멘트 삭제 실패');
        } else {
          this.toastrService.error(err.message, '코멘트 삭제 실패');
        }
      });

  }

  readMoreComments() {

    Promise.resolve()
      .then(() => {
        this.commentLoading = true;
        const params = {
          limit: COMMENTS_LIMIT.toString(),
          offset: this.commentsOffset.toString(),
          by: 'post',
          q: this.post._id,
          regex: 'false'
        };
        return this.commentService.read(params);
      })
      .then(comments => {
        this.comments.push(...comments);
        this.commentLoading = false;
        this.commentsOffset += COMMENTS_LIMIT;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
        this.commentLoading = false;
      });

  }

  getCommentState(comment: IComment): string {
    if (comment.author._id === this.me._id) {
      return 'me-thumbnail-border';
    } else if (this.me.followings.includes(comment.author._id)) {
      return 'user-thumbnail-border';
    } else {
      return undefined;
    }
  }

  canIDelete(comment: IComment): boolean {
    if (comment.author._id === this.me._id || this.post.author._id === this.me._id) {
      return true;
    } else {
      return false;
    }
  }

  public get me(): IUser {
    return this.signService.me;
  }

  public thumbnailStyle(id: string): Object {
    return { 'background-image': `url(${this.userService.getThumbnailURL(id)})` };
  }

}
