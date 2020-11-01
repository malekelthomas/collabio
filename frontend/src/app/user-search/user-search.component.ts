import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs/';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from './../user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();

  @ViewChild('searchList') searchList: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;
  constructor(private userService: UserService, private router: Router, private renderer: Renderer2) {

    this.renderer.listen('window', 'click', (e:Event) =>{ //monitoring clicks on the page

      if(e.target !== this.searchList.nativeElement){
        this.searchTerms.next(""); //set to null
        this.searchBox.nativeElement.value = ""; //clear input

      }
    })


   }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(


      debounceTime(300),


      distinctUntilChanged(),


      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }


  goToUser(user: string){
    this.router.navigate(['/users'], {queryParams:{user_name:user}});
  }

}
