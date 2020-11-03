import { Component, OnInit } from '@angular/core';
import { ReplyComment } from '../replyComment';
import { InitComment } from '../comment';
import { PostService } from './../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent implements OnInit {

  posts;
  comments;
  loadedComments;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }




  getPosts(){
    //
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts)
    });
  }

  loadComments(){
    this.posts.forEach(post => {

      post.comments.forEach(comment =>{
        this.comments = comment;
        this.loadedComments = true;
        console.log(this.comments);
      })
  })

  }

}
