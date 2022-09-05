import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../Services/Utility/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from 'src/app/Object/Fornitore';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Ordine, ObjectOrdine, R_PO } from '../../Object/Fornitore';
import { DialogOrdineComponent } from '../dialog-ordine/dialog-ordine.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.component.html',
  styleUrls: ['./ordine.component.css']
})
export class OrdineComponent implements OnInit {
  
  error!:boolean;
  message!:string;

  elems_col:string[] = ['id',  'dataCreazione', 'dataConsegna','fornitore', 'actions'];

  rows!:MatTableDataSource<Ordine>;

  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private service:UtilityService, private _snackbar:MatSnackBar, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.service.getOrdini(this.afterNgOnInit.bind(this))
  }
  afterNgOnInit(response:any, status:boolean){
    if(status){
      this.error = false;
      var arr = response as Ordine[];
      for ( let ord of arr){
        ord.dataConsegna = new Date(ord.dataConsegna);
        ord.dataCreazione = new Date(ord.dataCreazione);
      }
      this.rows = new MatTableDataSource<Ordine>(arr);
      this.rows.paginator = this.paginator;
      this.rows.sort = this.sort;
    }else{
      this.error =true;
      this.message = response.error['message'];
    }
  }

  add(){
    var now = new Date();
    this.dialog.open(DialogOrdineComponent, {}).afterClosed().subscribe({
      next: (value:any) =>{
        if(value == undefined) return;
        this.service.addOrdine(value as ObjectOrdine, this.afterAdd.bind(this) );
      }
    })
  }

  afterAdd(response:any, status:boolean){
    if(status){
      this._snackbar.open('Aggiunta avvenuta con successo', '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error=true;
      this.message = response.error['message'];
    }
  }

  delete(ordine:Ordine){
    this.dialog.open(DialogDeleteComponent, {}).afterClosed().subscribe({
      next : (value:any)=>{
        if(value == false) return;
        this.service.deleteOrdine(ordine.id, this.afterDelete.bind(this));
      }
    })
  }
  afterDelete(response:any, status:boolean){
    if(status){
      this._snackbar.open('Rimozione avvenuta con successo', '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error=true;
      this.message = response.error['message'];
    }
  }

  modify(response:any, status:boolean){
    this.error = status;
    if(status){
      this.ordine.ordini = response as R_PO[];
      this.dialog.open(DialogOrdineComponent, {data: { ordine :this.ordine}}).afterClosed().subscribe({
        next: (value:any) =>{
          if(value == undefined){ this.ngOnInit(); return;}
          var ordine :ObjectOrdine = value as ObjectOrdine;
          this.service.modificaOrdine(ordine, this.ordine.id, this.afterModify.bind(this));
        }
      })
    }else{
      this.message = response.error['message'];
    }
    
  }
  ordine!:Ordine ;
  preModify(ordine:Ordine){
    this.ordine = ordine;
    this.service.getRPOByOrdine(ordine.id, this.modify.bind(this));
  }
  afterModify(response:any, status:boolean){
    if(status){
      this._snackbar.open('Modifica avvenuta con successo', '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error =true;
      this.message = response.error;
    }
  }

}
