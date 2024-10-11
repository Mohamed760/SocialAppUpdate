import { Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { Comment } from '../../../core/interfaces/get-post-comment';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { platformBrowser } from '@angular/platform-browser';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input({required:true}) postId!:string;
  commentList!:Comment[];
  commentFrom!:FormGroup;
  commentMsg!:string;
  updateCommentMsg!:string;
  commentId!:string;
  userToken!:any;
  currentUserId!:string | null;
  
  commentUpdateForm:FormGroup = new FormGroup({
    content : new FormControl(null, [Validators.maxLength(30)])
  })
  
  constructor(private _CommentsService:CommentsService, @Inject(PLATFORM_ID) id:object){
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem("userTokenSocial")) {
        this.userToken = localStorage.getItem("userTokenSocial");
      }
    }

    if(isPlatformBrowser(id)){
    this.currentUserId =  localStorage.getItem("userid");
    }
  }

  ngOnInit(): void {

    this.commentFrom = new FormGroup({
      content : new FormControl(null),
      post : new FormControl(this.postId)
    })


  this.getComment()
  console.log(this.userToken);
  
  }


  getComment(){
    this._CommentsService.getPostComment(this.postId).subscribe({
      next : (res)=>{
        console.log(`postId ${this.postId}`, res.comments);
        this.commentList=res.comments;
      },

      error: (err)=>{
        (err);
      }
    })
  }

  sendComment(){
    this._CommentsService.createComment(this.commentFrom.value).subscribe({
      next : (res)=>{
        console.log(res); 
        this.commentList= res.comments;
        this.commentFrom.get('content')?.reset();
      },

      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  deleteComment(commentId:string){
    this._CommentsService.deleteComment(commentId).subscribe({
      next : (res)=>{
        console.log(res);
        this.getComment();
      },

      error: (err)=>{
        console.log(err);
      }
    })
  }

  updateComment(commentId:string){
    this._CommentsService.updateComment(commentId, this.commentUpdateForm.value).subscribe({
      next : (res)=>{
        console.log(res);
        this.updateCommentMsg = "Comment update Successfully"
        this.getComment()
      },

      error : (err)=>{
        console.log(err);
      }
    })
  }

  sendCommentId(Id:any){
    this.commentId = Id;
    console.log(this.commentId);
    
  }

  isCommentOwner(commentUserId:string) : boolean {
    return this.currentUserId === commentUserId;
  }

}
