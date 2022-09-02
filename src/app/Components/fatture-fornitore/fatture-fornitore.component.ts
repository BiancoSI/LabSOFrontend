import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../Services/Utility/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FatturaFornitore } from 'src/app/Object/Fornitore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogFatturafComponent } from '../dialog-fatturaf/dialog-fatturaf.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-fatture-fornitore',
  templateUrl: './fatture-fornitore.component.html',
  styleUrls: ['./fatture-fornitore.component.css']
})
export class FattureFornitoreComponent implements OnInit {

  rows!:MatTableDataSource<FatturaFornitore>;
  elems_col = ['id', 'data', 'saldato', 'prezzo', 'ordine_id', 'actions'];

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  error!:boolean;
  message!:string;

  constructor(private service : UtilityService, private _snackbar:MatSnackBar, private dialogRef:MatDialog) {

   }

  ngOnInit(): void {
    this.service.getFattureF(this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response:any, status:boolean){
    if(status){
      var arr = response as FatturaFornitore[];
      arr.forEach(element => {
        element.data = new Date(element.data);
      });
      this.rows = new MatTableDataSource<FatturaFornitore>(arr);
      this.rows.paginator = this.paginator;
      this.rows.sort = this.sort;
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

  add(){
    this.dialogRef.open(DialogFatturafComponent, {}).afterClosed().subscribe( {
      next : (value:any)=>{
        if(value == undefined){
          return;
        }
        var Fat:FatturaFornitore = value;
        this.service.addFattura(Fat, this.afterAdd.bind(this));
      }
    })
  }

  afterAdd(response:any, status:boolean){
    if(status){
      this._snackbar.open('Fornitura Aggiunta', '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

  deleteFattura(f:FatturaFornitore){
    this.dialogRef.open(DialogDeleteComponent, {}).afterClosed().subscribe({
      next: (value:boolean) =>{
        if(value){
          this.service.deleteFattura(f.id, this.afterDelete.bind(this));
        }
      }
    })
  }

  afterDelete(response:any, status:boolean){
    if(status){
      this._snackbar.open('Fattura Eliminata', '', {duration : 1500});
      this.ngOnInit();
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

  saldaFattura(ff :FatturaFornitore){
    ff.saldato = true;
    this.service.modicaFattura(ff, this.afterSaldata.bind(this));
  }

  afterSaldata(response:any, status:boolean){
    if(status){
      this._snackbar.open('Fattura '+(response as FatturaFornitore).id+" saldata", '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error=true;
      this.message = response.error['message'];
    }
  }

}
