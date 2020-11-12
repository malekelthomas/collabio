import { Component, OnInit } from '@angular/core';
import { ReplyComment } from '../replyComment';
import { InitComment } from '../comment';
import { PostService } from './../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent implements OnInit {

  posts;
  comments;
  loadedComments;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPosts();
  }




  getPosts(){
    this.route.queryParams.subscribe(val => {
        if(val.user_name){// if querying for another user
          this.postService.getOtherUserPosts(val.user_name).subscribe(posts => {
            this.posts = posts;
            console.log(this.posts)

          });
        }
      else{
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
          console.log(this.posts)
        });
      }
    })
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

  like(e){
    console.log(e.target.style.color)
    if(e.target.style.color == "red"){
      e.target.style.color = "grey";
    }
    else if(e.target.style.color == "" || e.target.style.color == "grey"){
      e.target.style.color = "red";
    }
  }

  delete(){
    alert("Are you sure?");
  }
}
