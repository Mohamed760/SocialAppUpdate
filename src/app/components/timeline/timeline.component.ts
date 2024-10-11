import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/interfaces/get-all-posts';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentsComponent,FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {

postList!:Post[];
savedFile!:File;
content:string = ''
successMsg!:string;

// pagginition var
currentPage: number = 1;
numberOfPages: number = 0;
limit: number = 10;

constructor(private _PostsService:PostsService,){}

ngOnInit(): void {

  if (typeof localStorage != "undefined") {
    localStorage.setItem("currentPageSocial","/timeline" )
  }
  
  this.getAllPost()
}

getAllPost(){
  this._PostsService.getAllPosts(this.currentPage, this.limit).subscribe({
    next : (res)=>{

      console.log(res);
      console.log("posts", res.posts);
      this.postList= res.posts.reverse();
      this.numberOfPages = res.paginationInfo.numberOfPages;
    },

    error : (err)=>{
      console.log(err);  
    }

  })
}

goToPage(page:number){
  if (page>= 1 && page<= this.numberOfPages) {
      this.currentPage = page;
  }
  this.getAllPost()
}

changeImage(e:Event){

  const input = e.target as HTMLInputElement

  if(input.files && input.files.length > 0){
    this.savedFile = input.files[0];
  }

  
}

createPost(){

const formData = new FormData();

formData.append("body", this.content);
formData.append("image", this.savedFile)

this._PostsService.createPost(formData).subscribe({
  next : (res)=>{
    console.log(res);
    this.successMsg = "Post Add Success"

  }
})
}


}
