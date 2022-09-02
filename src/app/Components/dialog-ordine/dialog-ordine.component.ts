import { Component, Inject, OnInit, AfterViewInit, OnChanges, SimpleChanges, enableProdMode, AfterViewChecked } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ordine, R_PO, Fornitore, Prodotto, Fornitura, ObjectOrdine, helpRPO } from '../../Object/Fornitore';
import { UtilityService } from '../../Services/Utility/utility.service';

@Component({
  selector: 'app-dialog-ordine',
  templateUrl: './dialog-ordine.component.html',
  styleUrls: ['./dialog-ordine.component.css']
})
export class DialogOrdineComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    dataCreazione: new FormControl('', [Validators.required]),
    dataConsegna: new FormControl('', [Validators.required]),
    fornitore: new FormControl('', [Validators.required]),
  });

  formGroup_prodotti: FormGroup = new FormGroup({
    prodotto: new FormControl('', [Validators.required]),
    quantita: new FormControl('', [Validators.min(1), Validators.required]),
    prezzo: new FormControl('', [Validators.required])
  });

  fornitori!: Fornitore[];
  prodotti: Prodotto[] = [];

  prodotti_scelti: helpRPO[] = [];

  fornitore!: string;

  error!: boolean;
  message!: string;

  ordine!: Ordine;
  constructor(
    private dialogRef: MatDialogRef<DialogOrdineComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private service: UtilityService
  ) {
    if (data != undefined) {
      this.ordine = data['ordine'];
      var dac: Date = new Date(this.ordine.dataCreazione);
      this.formGroup.controls['dataCreazione'].setValue(dac);
      dac = new Date(this.ordine.dataConsegna);
      this.formGroup.controls['dataConsegna'].setValue(dac);
      this.formGroup.controls['fornitore'].setValue(this.ordine.fornitore.piva);
      this.fornitore = this.ordine.fornitore.piva;
      console.log(this.formGroup);
      this.ordine.ordini.forEach(element => {
        var help: helpRPO = {
          prezzo: element.prezzo,
          prodotto: element.prodotto,
          quantita: element.quantita,
        }
        this.prodotti_scelti.push(help);
        this.service.getForniture(this.fornitore, this.afterChoseFornitore.bind(this));
      });
    } else {
      this.formGroup.controls['dataCreazione'].setValue('' + new Date());
    }
  }
  trova_prodotti(): void {
    if (this.fornitore == undefined || this.fornitore != this.formGroup.controls['fornitore'].value) {
      this.service.getForniture(this.formGroup.controls['fornitore'].value, this.afterChoseFornitore.bind(this));
      this.prodotti_scelti = [];
      this.fornitore = this.formGroup.controls['fornitore'].value;
    }
  }

  ngOnInit(): void {
    this.service.getFornitori(this.afterNgOnInit.bind(this));
  }

  afterNgOnInit(response: any, status: boolean) {
    if (status) {
      this.fornitori = response as Fornitore[];
    } else {
      this.error = true;
      this.message = response.error['message'];
    }
  }

  afterChoseFornitore(response: any, status: boolean) {
    if (status) {
      var forniture: Fornitura[] = response as Fornitura[];
      this.prodotti = [];
      forniture.forEach(element => {
        this.prodotti.push(element.prodotto);
      });
    } else {
      this.error=true;
      this.message = response.error['message'];
    }
  }

  addProdotto() {
    var id = this.formGroup_prodotti.controls['prodotto'].value;
    var prodotto: Prodotto = this.prodotti.find((value: Prodotto) => { return value.id === id }) as Prodotto;
    var quantita = this.formGroup_prodotti.controls['quantita'].value;
    var prezzo = this.formGroup_prodotti.controls['prezzo'].value;
    var help: helpRPO = {
      prodotto: prodotto,
      quantita: quantita,
      prezzo: prezzo
    }
    if (this.prodotti_scelti.find((value: helpRPO) => { return value.prodotto.id != help.prodotto.id }) || this.prodotti_scelti.length == 0)
      this.prodotti_scelti.push(help);
  }

  sendOrdine() {
    if (this.prodotti_scelti.length == 0) { this.dialogRef.close(); return; }
    var obj: ObjectOrdine = {
      dataConsegna: this.formGroup.controls['dataConsegna'].value,
      dataCreazione: this.formGroup.controls['dataCreazione'].value,
      piva: this.formGroup.controls['fornitore'].value,
      list: this.prodotti_scelti
    }
    this.dialogRef.close(
      obj
    );
  }
  cancel() {
    this.dialogRef.close();
  }
  rimuovi(p: helpRPO) {
    this.prodotti_scelti.splice(this.prodotti_scelti.indexOf(p), 1);
  }

}
