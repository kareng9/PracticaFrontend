import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../models/constanst';
import { GlobalParams } from '../models/globalParams';
import { CrearProductTypeDto } from '../models/crearProductTypeDto';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
   @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
   }

  getProductTypes(globalParams: GlobalParams):Observable<any> {
    let apiUrl= `${this.endpoint}/api/ProductType`;
    let params = new HttpParams();
    if(globalParams.search){
      params=params.append('search', globalParams.search);
    }
    if(globalParams.sort){
      params=params.append('sort', globalParams.sort);
    }
    if(globalParams.sortOrder){
      params=params.append('order', globalParams.sortOrder);
    }
    if(globalParams.pageSize){
      params=params.append('limit', globalParams.pageSize);
    }
    if(globalParams.pageNumber){
      params=params.append('offset', globalParams.pageNumber);
    }
    return this.http.get(apiUrl,{params: params});
  }

  getProductTypeById(code:string):Observable<any> {
    let apiUrl= `${this.endpoint}/api/ProductType/${code}`;
    console.log(apiUrl);

    return this.http.get(apiUrl);
  }

  createProductType(data: CrearProductTypeDto){
    let apiUrl= `${this.endpoint}/api/ProductType`;

    return this.http.post(apiUrl, data);
  }

  // eliminarProductType(code: string){
  //   let apiUrl= `${this.endpoint}/api/ProductType/${code}`;
  //   this.http.delete(apiUrl)
  //     .subscribe(
  //       response => console.log("resultado eliminar brand"+response)
  //     )

  // }
  deleteProductType(id:string): Observable<any>{
    let apiUrl= `${this.endpoint}/api/ProductType/${id}`;
    return this.http.delete(apiUrl);

  }

  updateProductType(data: any):Observable<any>{
    let apiUrl= `${this.endpoint}/api/ProductType`;
    return this.http.put(apiUrl, data).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else  {
      errorMessage = `Codigo error: ${error.status} mensaje: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(() =>{
      return errorMessage;
    });
  }

}
