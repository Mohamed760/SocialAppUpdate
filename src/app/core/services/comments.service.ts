import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';
import { GetPostComment } from '../interfaces/get-post-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient:HttpClient) { }

  createComment(data:object):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/comments`, data);
  }

  getPostComment(postId:string):Observable<GetPostComment>{
    return this._HttpClient.get<GetPostComment>(`${Enviroment.baseUrl}/posts/${postId}/comments`);
  }

  updateComment(commentId:string, data:object):Observable<any>{
    return this._HttpClient.put<any>(`${Enviroment.baseUrl}/comments/${commentId}`, data);
  }

  deleteComment(commentId:string):Observable<any>{
    return this._HttpClient.delete<any>(`${Enviroment.baseUrl}/comments/${commentId}`)
  }

}
