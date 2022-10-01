import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fornitore } from 'src/app/Object/Fornitore';
import { UtilityService } from '../../Services/Utility/utility.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogFornituraComponent } from '../dialog-fornitura/dialog-fornitura.component';
import { Prodotto } from '../../Object/Fornitore';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fornitore',
  templateUrl: './fornitore.component.html',
  styleUrls: ['./fornitore.component.css']
})
export class FornitoreComponent implements OnInit {

  elems_col = ['piva', 'nome', 'sede', 'recapito', 'actions'];
  rows !: MatTableDataSource<Fornitore>;

  error!:boolean;
  message!:string;

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private service: UtilityService, private dialog:MatDialog, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.service.getFornitori(this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response:any, status:boolean){
    if(status){
      this.error = false;
      this.rows = new MatTableDataSource<Fornitore>(response as Fornitore[]);
      this.rows.paginator = this.paginator;
      this.rows.sort = this.sort;
    }else{
      this.error =true;
      this.message = response.error['message'];
    }
  }

  add(){
    var elems = ['piva', 'nome', 'sede', 'recapito', 'fornitore'];
    var fornitore:Fornitore = 
    {
      piva: '',
      nome:'',
      recapito:'',
      sede:''
    }
    this.dialog.open(DialogComponent, {data: {elems, fornitore}}).afterClosed().subscribe(
      {
        next: (value:any)=>{
          if(value==undefined) return;
          var map:Map<any, any> = value as Map<any, any>;
          var toAdd : Fornitore ;
          var piva:string  = map.get('piva');
          var nome : string = map.get('nome');
          var sede:string = map.get('sede');
          var recapito:string = map.get('recapito');
          toAdd = {
            piva:piva, 
            nome:nome,
            sede:sede, 
            recapito:recapito
          }
          this.service.addFornitore(toAdd, this.afterAdd.bind(this));
        }
      }
    )
  }
  afterAdd(response:any, status:boolean){
    if(status){
      this._snackbar.open('Aggiunto Fornitore '+(response as Fornitore), '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error = true;
      this.message = (response as HttpErrorResponse).error['message'];
    }
  }

  delete(fornitore:Fornitore){
    this.dialog.open(DialogDeleteComponent, {data:fornitore}).afterClosed().subscribe({
      next: (value:boolean) =>{
        if(!value) return;
        this.service.deleteFornitore(fornitore.piva, this.afterDelete.bind(this));
      }
    })
  }

  afterDelete(response:any, status:boolean){
    if(status){
      this._snackbar.open('Eliminato', '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error =true;
      this.message = response.error['message'];
    }
  }

  modify(fornitore:Fornitore){
    this.dialog.open(DialogComponent, {
      data:{
        elems:['piva', 'nome', 'sede', 'recapito', 'fornitore'],
        fornitore
      }
    }).afterClosed().subscribe({
      next: (value:any) =>{
        if(value==undefined) return;
        var map:Map<any, any> = value as Map<any, any>;
        var toAdd : Fornitore ;
        var piva:string  = map.get('piva');
        var nome : string = map.get('nome');
        var sede:string = map.get('sede');
        var recapito:string = map.get('recapito');
        toAdd = {
          piva:piva, 
          nome:nome,
          sede:sede, 
          recapito:recapito
        }
        this.service.modificaFornitore(toAdd, this.afterModify.bind(this));
      }
    })
  }
  
  afterModify(response:any, status:boolean){
    if(status){
      this._snackbar.open("Modifica avvenuta con successo ", '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error =true;
      this.message = response.error['message'];
    }
  }

  addFornitura(f:Fornitore){
    this.dialog.open(DialogFornituraComponent, {data : {piva:f.piva}}).afterClosed().subscribe({
      next: (value:any)=>{
        if(value == undefined ) return;
        var toAdd :Prodotto[] = value['toAdd'];
        var toDel: Prodotto[] = value['toDel'];
        console.log(toAdd);
        console.log(toDel);
        if(toAdd.length >0 )
          this.service.addForniture(f.piva, toAdd, this.afterAddFornitura.bind(this)); 
        if(toDel.length>0)
          this.service.deleteFornitura(f.piva, toDel, this.afterDeleteFornitura.bind(this));
      }
    })
  }
  afterAddFornitura(response:any, status:boolean){
    if(status){
        this._snackbar.open("Fornitura Aggiunta ", '', {duration:1500});
        this.ngOnInit();
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

  afterDeleteFornitura(response:any, status:boolean){
    if(status){
      this._snackbar.open("Fornitura cancellata", '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

}
