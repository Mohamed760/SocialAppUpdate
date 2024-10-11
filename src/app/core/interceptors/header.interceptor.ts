import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
// req

const _PLATFORM_ID = inject(PLATFORM_ID);

if(isPlatformBrowser(_PLATFORM_ID)){
  
  if(localStorage.getItem('userTokenSocial') !== null){

    req = req.clone({
      setHeaders : { token : localStorage.getItem('userTokenSocial')! }
    })
  
  }


}



  return next(req);
  // res
};
