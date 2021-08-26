import { Timeline } from './../models/timeline.model';
import { PolisTahunan } from './../models/polis-tahunan.model';
import { FormSimulasi } from './../models/form-simulasi.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl+'SimulasiUpgrade/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class SimulasiUpgradeService {

  constructor(private http: HttpClient) { }

  getSimulasiUpgradeDataByNomorKontrak(nomorRekening,nomorPin): Observable<any> {
    return this.http.get(`${baseUrl}getData?nomorRekening=${nomorRekening}&nomorPin=${nomorPin}`);
  }

  insertSimulasi(data : FormSimulasi): Observable<any> {
    return this.http.post(`${baseUrl}`, data, httpOptions);
  }

  insertPolisTahunan(data : PolisTahunan,id : any): Observable<any> {
    return this.http.post(`${baseUrl}${id}/polisTahunan`, data, httpOptions);
  }

  insertMassPolisTahunan(data : any,id: any): Observable<any> {
    return this.http.post(`${baseUrl}${id}/insertMassPolisTahunan`, data, httpOptions);
  }

  getPDF(id: any): Observable<Blob> {
      return this.http.get(`${baseUrl}${id}/printPdf`, { responseType: 'blob' });
  }

  getFile(url: string): Observable<Blob> {
    return this.http.get(`${url}`, { responseType: 'blob' });
  }

  getList(): Observable<any> {
    return this.http.get(`${baseUrl}getList`);
  }

  getMaskapaiList(): Observable<any> {
    return this.http.get(`${baseUrl}getList?isMaskapai=true`,);
  }

  getSimulasiDetailById(id: any) : Observable<any> {
    return this.http.get(`${baseUrl}${id}/getDetail`);
  }

  changeStatus(id: any,data : Timeline) : Observable<any>{
    return this.http.post(`${baseUrl}${id}/changeStatus`, data, httpOptions);
  }

  postFile(fileToUpload: File,id: string): Observable<any> {
    const endpoint = `${baseUrl}${id}/uploadFile`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(endpoint, formData);
}
}
