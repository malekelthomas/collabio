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
  currentLoggedInUser = localStorage.getItem('user_name');
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



  loadComments(post){
    console.log(post.loadedComments = true)
    console.log(post)
    post.comments.forEach(comment =>{
      this.comments = comment;
      this.loadedComments = true;
      console.log(this.comments);
    })
    /* this.posts.forEach(post => {

      post.comments.forEach(comment =>{
        this.comments = comment;
        this.loadedComments = true;
        console.log(this.comments);
      })
    }) */
  }

  like(e, post){
    console.log(e.target.style.color)
    if(e.target.style.color == "red"){//unliking post
      e.target.style.color = "grey";
      this.route.queryParams.subscribe(val => {
        if(val.user_name){
          this.postService.unlikePost(post,val.user_name, this.currentLoggedInUser).subscribe();
        }
        else{
          this.postService.unlikePost(post,this.currentLoggedInUser,this.currentLoggedInUser).subscribe();
        }
      })
    }
    else if(e.target.style.color == "" || e.target.style.color == "grey"){//liking post
      e.target.style.color = "red";
      console.log("post liked");
      this.route.queryParams.subscribe(val => {
        if(val.user_name){
          this.postService.likePost(post,val.user_name, this.currentLoggedInUser).subscribe();
        }
        else{
          this.postService.likePost(post,this.currentLoggedInUser,this.currentLoggedInUser).subscribe();
        }
      })

    }

  }

  delete(){
    alert("Are you sure?");
  }
}
