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
  postOptions = {"artwork":false, "project":false, "song":false}
  form: FormGroup = new FormGroup({
    post_caption: new FormControl(''),
    post_type: new FormControl(''),
    post_content: new FormControl(null)
  });

  selectedPostType;
  projectInfo = {projectImage:"", projectUrl:""};
  @ViewChild("createPost") createPost: ElementRef;
  @ViewChild("createPostButton") createPostButton: ElementRef;
  @ViewChild("postContent") postContent: ElementRef;
  @ViewChild("form") formG: ElementRef;
  constructor(private postService: PostService, private renderer: Renderer2, private router: Router) {

    this.renderer.listen('window', 'click', (e:Event) =>{ //monitoring clicks on the page

      console.log(e.target, this.createPostButton.nativeElement, this.create)
      if(this.createPostButton){
        if(e.target == this.createPostButton.nativeElement.children[0]){
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
      console.log(this.form.value)
      this.postService.createPost(this.form.value)
        .subscribe(submitted=> {
          console.log(submitted);
          this.router.navigate(["/users"]);
        });

    }
  }

  onClickedOutside(e: Event){
    this.create = !this.create;
  }

  selectPostType(postType){
    this.form.controls.post_content.setValue("");
    this.projectInfo.projectImage="";
    this.projectInfo.projectUrl="";
    Object.keys(this.postOptions).forEach(key=> {
      if(key != postType){
        this.postOptions[key] = false;
      }
      else{
        this.selectedPostType=postType;
        this.postOptions[key] = true;
        this.form.controls.post_type.setValue(postType) //when clicking toggle add that toggle to post type
      }
    })
  }

  fillForm(postType, infoType, value){
    if(postType=='project'){
      if(infoType=='projectUrl'){
        this.projectInfo[infoType]=value;
      }
      if(infoType == 'projectImage'){
        this.projectInfo[infoType]=value.target.files[0].name;
        this.form.controls.post_content.setValue(this.projectInfo, {emitModelToViewChange: false}); //need emit when using setValue for file input, read-only
      }
    }
  }




}
