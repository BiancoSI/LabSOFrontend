import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestManager } from '../RestService/RestManager';
import { ADD, ADDRESS_SERVER, ADMIN, DELETE, FATUREF, FORNITORI, FORNITURE, GET, MODIFY, ORDINI, PRODOTTI } from 'src/app/Static/Static';
import { Fornitore, Ordine, Prodotto, FatturaFornitore, ObjectOrdine } from '../../Object/Fornitore';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private rest:RestManager;
  constructor(private http:HttpClient) {
    this.rest = new RestManager(http);
  }

  getFornitori(callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+FORNITORI, {}, callback);
  }
  addFornitore(fornitore:Fornitore, callback:any){
    return this.rest.makePostRequest(ADDRESS_SERVER, ADMIN+ADD+"-"+FORNITORI, {}, fornitore, callback);
  }
  deleteFornitore(piva:string, callback:any){
    return this.rest.makeDeleteRequest(ADDRESS_SERVER, ADMIN+DELETE+"-"+FORNITORI, {piva:piva}, {}, callback);
  }
  modificaFornitore(fornitore:Fornitore, callback:any){
    return this.rest.makePutRequest(ADDRESS_SERVER, ADMIN+MODIFY+"-"+FORNITORI, {}, fornitore, callback);
  }

  getOrdini(callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+ORDINI, {}, callback);
  }
  getRPOByOrdine(id:number, callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+ORDINI+GET, {id:id}, callback);
  }
  addOrdine(ordine:ObjectOrdine, callback:any){
    return this.rest.makePostRequest(ADDRESS_SERVER, ADMIN+ADD+"-"+ORDINI, {}, ordine, callback);
  }
  deleteOrdine(id:number, callback:any){
    return this.rest.makeDeleteRequest(ADDRESS_SERVER, ADMIN+DELETE+"-"+ORDINI, {id:id}, {}, callback );
  }
  modificaOrdine(ordine:ObjectOrdine, id:number, callback:any){
    return this.rest.makePutRequest(ADDRESS_SERVER, ADMIN+MODIFY+"-"+ORDINI, {id:id}, ordine, callback);
  }

  getProdotti(callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+PRODOTTI, {}, callback);
  }
  addProdotto(prodotto:Prodotto, callback:any){
    return this.rest.makePostRequest(ADDRESS_SERVER, ADMIN+ADD+"-"+PRODOTTI, {}, prodotto, callback);
  }
  deleteProdotto(id:number, callback:any){
    return this.rest.makeDeleteRequest(ADDRESS_SERVER, ADMIN+DELETE+"-"+PRODOTTI, {id:id}, {}, callback);
  }
  modificaProdotto(prodotto:Prodotto, callback:any){
    return this.rest.makePutRequest(ADDRESS_SERVER, ADMIN+MODIFY+"-"+PRODOTTI, {}, prodotto, callback);
  }

  getFattureF(callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+FATUREF, {}, callback);
  }
  getOrdiniNonFatturati(callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+ORDINI+GET+"/"+FATUREF, {}, callback);
  }
  addFattura(ff : FatturaFornitore, callback:any ){
    return this.rest.makePostRequest(ADDRESS_SERVER, ADMIN+ADD+"-"+FATUREF, {}, ff, callback);
  }
  deleteFattura(id:number, callback:any){
    return this.rest.makeDeleteRequest(ADDRESS_SERVER, ADMIN+DELETE+"-"+FATUREF, {id:id}, {}, callback);
  }
  modicaFattura(fattura :FatturaFornitore, callback:any){
    return this.rest.makePutRequest(ADDRESS_SERVER, ADMIN+MODIFY+"-"+FATUREF, {}, fattura, callback);
  }

  getForniture(piva:string, callback:any){
    return this.rest.makeGetRequest(ADDRESS_SERVER, ADMIN+"/"+FORNITURE+GET,{piva:piva}, callback );
  }
  addForniture(piva:string, prodo:Prodotto[], callback:any){
    return this.rest.makePostRequest(ADDRESS_SERVER, ADMIN+ADD+"-"+FORNITURE, {piva:piva}, {prodotti:prodo}, callback);
  }
  deleteFornitura(piva:string, prodo:Prodotto[], callback:any){
    return this.rest.makeDeleteRequest(ADDRESS_SERVER, ADMIN+DELETE+"-"+FORNITURE, {piva:piva}, {prodotti:prodo}, callback);
  }

}
