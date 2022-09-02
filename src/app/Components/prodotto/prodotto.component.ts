import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from '../../Object/Fornitore';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UtilityService } from '../../Services/Utility/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit {

  error!: boolean;
  message!: string;

  elems_col: string[] = ['id', 'nome', 'quantita', 'tipologia', 'actions'];

  rows!: MatTableDataSource<Prodotto>;

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private service: UtilityService, private _snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getProdotti(this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response: any, status: boolean) {
    if (status) {
      this.error = false;
      this.rows = new MatTableDataSource<Prodotto>(response as Prodotto[]);
      this.rows.paginator = this.paginator;
      this.rows.sort = this.sort;
    } else {
      this.error = true;
      this.message = response.error['message'];
    }
  }

  add() {
    var elems = ['id', 'nome', 'tipologia', 'quantita', 'prodotto'];
    var prodotto: Prodotto =
    {
      id: 0,
      nome: '',
      tipologia: '',
      quantita: 0
    }
    this.dialog.open(DialogComponent, { data: { elems: elems, prodotto :prodotto } }).afterClosed().subscribe(
      {
        next: (value: any) => {
          if (value == undefined) return;
          var map: Map<any, any> = value as Map<any, any>;
          var toAdd: Prodotto;
          var id: number = map.get('id');
          var nome: string = map.get('nome');
          var tipologia: string = map.get('tipologia');
          var quantita: number = map.get('quantita');
          toAdd = {
            id: id,
            nome: nome,
            tipologia: tipologia,
            quantita: quantita
          }
          this.service.addProdotto(toAdd, this.afterAdd.bind(this));
        }
      }
    )
  }
  afterAdd(response: any, status: boolean) {
    if (status) {
      this._snackbar.open('Aggiunto Prodotto ' + (response as Prodotto), '', { duration: 1500 });
      this.ngOnInit();
    } else {
      this.error=true;
      this.message = response.error['message'];
    }
  }

  delete(prodotto: Prodotto) {
    this.dialog.open(DialogDeleteComponent, { data: prodotto }).afterClosed().subscribe({
      next: (value: boolean) => {
        if (!value) return;
        this.service.deleteProdotto(prodotto.id, this.afterDelete.bind(this));
      }
    })
  }

  afterDelete(response: any, status: boolean) {
    if (status) {
      this._snackbar.open('Eliminato', '', { duration: 1500 });
      this.ngOnInit();
    } else {
      this.error=true;
      this.message = response.error['message'];
    }
  }

  modify(prodotto: Prodotto) {
    this.dialog.open(DialogComponent, {
      data: {
        elems: ['id', 'nome', 'tipologia', 'quantita', 'prodotto'],
        prodotto
      }
    }).afterClosed().subscribe({
      next: (value: any) => {
        if (value == undefined) return;
        var map: Map<any, any> = value as Map<any, any>;
        var toAdd: Prodotto;
        var id: number = map.get('id');
        var nome: string = map.get('nome');
        var tipologia: string = map.get('tipologia');
        var quantita: number = map.get('quantita');
        toAdd = {
          id: id,
          nome: nome,
          tipologia: tipologia,
          quantita: quantita
        }
        this.service.modificaProdotto(toAdd, this.afterModify.bind(this));
      }
    })
  }

  afterModify(response:any, status:boolean){
    if(status){
      this._snackbar.open("Modifica avvenuta con successo ", '', {duration:1500});
      this.ngOnInit();
    }else{
      this.error = true;
      this.message = response.error['message'];
    }
  }

}
