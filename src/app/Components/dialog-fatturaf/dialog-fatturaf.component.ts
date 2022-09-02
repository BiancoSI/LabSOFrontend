import { Component,Inject, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ordine, Prodotto, R_PO, FatturaFornitore } from '../../Object/Fornitore';
import { UtilityService } from '../../Services/Utility/utility.service';

@Component({
  selector: 'app-dialog-fatturaf',
  templateUrl: './dialog-fatturaf.component.html',
  styleUrls: ['./dialog-fatturaf.component.css']
})
export class DialogFatturafComponent implements OnInit {

  ordini_non_fatturati:Ordine[] = [];
  prodotti_di_ord!:R_PO[];

  error!:boolean;
  message!:string;

  constructor(
    public dialogRef:MatDialogRef<DialogFatturafComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:UtilityService
  ) { }

  ngOnInit(): void {
    this.service.getOrdiniNonFatturati(this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response:any, status:boolean){
    if(status){
      var arr =response as R_PO[];
      arr.forEach(element => {
        element.ordine.dataCreazione = new Date(element.ordine.dataCreazione);
        element.ordine.dataConsegna = new Date(element.ordine.dataConsegna);
      });
      this.prodotti_di_ord = response as R_PO[];
      this.prodotti_di_ord.forEach(element => {
        if( this.ordini_non_fatturati.length == 0 || !this.ordini_non_fatturati.find((value:Ordine)=>{return value.id == element.ordine.id})) 
          this.ordini_non_fatturati.push(element.ordine);
      });
    }else{
      this. error =true;
      this.message = response.error['message'];
    }
  }

  sendFattura(ordine:Ordine, saldato:MatCheckbox){
    var fat:FatturaFornitore = {
      id:0,
      data: new Date(),
      ordine: ordine,
      prezzo : this.calcolaTotale(ordine.id),
      saldato:saldato.checked
    }
    this.dialogRef.close(fat);
  }

  calcolaTotale(id:number):number{
    var tot = 0;
    this.prodotti_di_ord.forEach(element => {
      if(element.ordine.id == id){
        tot+=(element.prezzo*element.quantita);
      }
    });
    return tot;
  }

}
