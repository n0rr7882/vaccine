import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMENTS_LIMIT, CommentService } from '../vaccine.service';
import { IPost, IComment } from '../vaccine.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId: string;

  private writeLoading: boolean;
  private commentLoading: boolean;
  private commentsOffset: number;
  public comments: IComment[];

  writeForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(
    public commentService: CommentService,
    private toastrService: ToastrService
  ) { }

  public get wl(): boolean { return this.writeLoading; }
  public get cl(): boolean { return this.commentLoading; }

  public set wl(state: boolean) { this.writeLoading = state; }
  public set cl(state: boolean) { this.commentLoading = state; }

  ngOnInit() {
    this.writeLoading = false;
    this.commentLoading = false;
    this.commentsOffset = 0;
    this.comments = [];
    this.readMoreComments();
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
        return this.commentService.create(this.postId, data);
      })
      .then(comment => {
        this.comments.unshift(comment);
        this.writeForm.setValue({ content: '' });
        this.toastrService.success('코멘트 등록 성공');
        this.writeLoading = false;
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

  readMoreComments() {

    Promise.resolve()
      .then(() => {
        this.commentLoading = true;
        const params = {
          limit: COMMENTS_LIMIT.toString(),
          offset: this.commentsOffset.toString(),
          by: 'post',
          q: this.postId,
          regex: 'false'
        };
        return this.commentService.read(params);
      })
      .then(comments => {
        this.comments.push(...comments);
        return this.commentLoading = false;
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

}
