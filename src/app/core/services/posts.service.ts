import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';
import { GetAllPosts } from '../interfaces/get-all-posts';
import { GetMyPosts } from '../interfaces/get-my-posts';
import { GetSinglePost } from '../interfaces/get-single-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _HttpClient:HttpClient) { }

  createPost(data:object):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/posts`, data);
  }

  getAllPosts(page:number, limit:number):Observable<GetAllPosts>{
    return this._HttpClient.get<GetAllPosts>(`${Enviroment.baseUrl}/posts?limit=${limit}&page=${page}`);
  }

  getMyPosts():Observable<GetMyPosts>{
    return this._HttpClient.get<GetMyPosts>(`${Enviroment.baseUrl}/users/664bcf3e33da217c4af21f00/posts`);
  }

  getSinglePost(postId:string):Observable<GetSinglePost>{
    return this._HttpClient.get<GetSinglePost>(`${Enviroment.baseUrl}/posts/${postId}`);
  }


  updatePost(data:object, postId:string):Observable<any>{
    return this._HttpClient.put<any>(`${Enviroment.baseUrl}/posts/${postId}`, data)
  }

  deletePost(postId:string):Observable<any>{
    return this._HttpClient.delete<any>(`${Enviroment.baseUrl}/posts/${postId}`)
  }

}
