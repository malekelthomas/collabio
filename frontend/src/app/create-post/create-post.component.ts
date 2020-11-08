import { Input, EventEmitter,Component, OnInit, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from './../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  create = false;
  form: FormGroup = new FormGroup({
    post_caption: new FormControl(''),
    post_type: new FormControl(''),
    post_content: new FormControl('')
  });

  @ViewChild("createPost") createPost: ElementRef;
  @ViewChild("createPostButton") createPostButton: ElementRef;
  @ViewChild("postContent") postContent: ElementRef;
  @ViewChild("form") formG: ElementRef;
  constructor(private postService: PostService, private renderer: Renderer2) {

    this.renderer.listen('window', 'click', (e:Event) =>{ //monitoring clicks on the page

      //console.log(e.target, this.createPost, this.create)
      if(this.createPostButton){
        if(e.target == this.createPostButton.nativeElement){
          this.create = !this.create;

        }
      }
    })
   }

  ngOnInit(): void {
  }

  @Output() submitEm: EventEmitter<unknown> = new EventEmitter;
  submit(){
    if(this.form.valid){
      this.submitEm.emit(this.form.value);
    }
  }

  onClickedOutside(e: Event){
    this.create = !this.create;
  }



}
