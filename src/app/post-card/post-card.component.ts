import { Component, OnInit, Input } from '@angular/core';
import { IPost, IUser } from '../vaccine.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;

  constructor() { }

  ngOnInit() {
  }

}
