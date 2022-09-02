import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Prodotto, Fornitore, Fornitura } from '../../Object/Fornitore';
import { UtilityService } from '../../Services/Utility/utility.service';

@Component({
  selector: 'app-dialog-fornitura',
  templateUrl: './dialog-fornitura.component.html',
  styleUrls: ['./dialog-fornitura.component.css']
})
export class DialogFornituraComponent implements OnInit {

  prodotti_che_serve:Prodotto[] =[];
  prodotti_che_non:Prodotto[] = [];
  forniture_aggiunta:Prodotto[] = [];
  forniture_delete : Prodotto[] = [];
  piva:string;

  error!:boolean;
  message!:string;

  @ViewChild('serviti') serviti!:MatSelectionList;
  @ViewChild('non_serviti') non_serviti!:MatSelectionList;
  constructor(
    private dialogRef:MatDialogRef<DialogFornituraComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private service:UtilityService,
  ) { 
    this.piva = data['piva'];
  }

  ngOnInit(): void {
    this.service.getForniture(this.piva, this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response:any, status:boolean){
    if(status){
      var arr  = response as Fornitura[];
      arr.forEach(element => {
        this.prodotti_che_serve.push(element.prodotto);
      });
      this.service.getProdotti(this.afterNgOnInit_2.bind(this));
    }else{
      this.error=true;
      this.message = response.error['message'];
    }
  }

  afterNgOnInit_2(response:any, status:boolean){
    if(status){
      var arr = response as Prodotto[];
      arr.forEach(element => {
        if(!this.prodotti_che_serve.find((elem:Prodotto)=>{return elem.id == element.id}) || this.prodotti_che_serve.length == 0)
          this.prodotti_che_non.push(element);
      });
    }else{
      this.error=true;
      this.message = response.error['message'];
    }
  }

  addToFornitura(prodotto:Prodotto):boolean{
    var ind = this.forniture_aggiunta.indexOf(prodotto);
    if(ind<0){
      this.forniture_aggiunta.push(prodotto);
      return true;
    }else{
      this.forniture_aggiunta.splice(ind, 1);
      return false;
    }
  }

  deleteFromFornitura(prodotto:Prodotto){
    var ind = this.forniture_delete.indexOf(prodotto);
    if(ind<0){
      this.forniture_delete.push(prodotto);
      return true;
    }else{
      this.forniture_delete.splice(ind, 1);
      return false;
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  send(){
    var toAdd :Prodotto[] = [];
    var toDel :Prodotto[] = [];
    this.serviti.selectedOptions.selected.forEach(element => {
      console.log(element.value);
      toDel.push(element.value);
    });
    this.non_serviti.selectedOptions.selected.forEach(element =>{
      console.log(element.value);
      toAdd.push(element.value);
    });
    this.dialogRef.close(
      {
        toAdd: toAdd,
        toDel: toDel,
      }
    );
  }



}
