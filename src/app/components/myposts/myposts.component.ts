import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/interfaces/get-all-posts';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-myposts',
  standalone: true,
  imports: [CommentsComponent, DatePipe,FormsModule],
  templateUrl: './myposts.component.html',
  styleUrl: './myposts.component.scss'
})
export class MypostsComponent implements OnInit {

  postList!:Post[];
  updateMsg!:string;
  savedFile!:File;
  content:string = ''

  constructor(private _PostsService:PostsService){}

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPageSocial","/myposts" )
      this.getMyPosts();
    }

  }

  getMyPosts(){
    this._PostsService.getMyPosts().subscribe({
      next : (res)=>{ 
        this.postList= res.posts;
        console.log("My Posts", this.postList);
      },

      error : (err)=>{
        console.log(err);
      }

    })
  }


  deletePost(postId:string){
    this._PostsService.deletePost(postId).subscribe({
      next : (res)=>{
        console.log(res);
        this.getMyPosts()
      },

      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  changeImage(e:Event){
    const input = e.target as HTMLInputElement

    if(input.files && input.files.length > 0){
      this.savedFile = input.files[0];
      console.log(this.savedFile);
      
    }
  }

  updatePost(postId:string){
    const updateData = new FormData();

    updateData.append("body", this.content)
    updateData.append("image", this.savedFile)

    this._PostsService.updatePost(updateData,postId).subscribe({
      next : (res)=>{
        console.log(res, "Updated res");
        this.updateMsg = "Post Update Successfully"
        this.getMyPosts();
      }, 

       error : (err)=> {
       console.log(err, "Updated Error");

      }

    })
  }

}
