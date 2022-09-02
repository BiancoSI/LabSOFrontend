import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  formGroup:FormGroup = new FormGroup({});
  elems!:string[];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.elems= data['elems'];
    var name = this.elems.pop();
    var object = data[''+name];
    this.elems.forEach(element => {
      this.formGroup.addControl(''+element, new FormControl(''+object[''+element], [Validators.required]));
    });
  }

  ngOnInit(): void {
  }

  onClick(){
    this.dialogRef.close();
  }

  submit(){
    let map: Map<any, any> = new Map();
    this.elems.forEach(element => {
      map.set(element, this.formGroup.controls[''+element].value);
    });
    console.log(map);
    this.dialogRef.close(
      map
    );
  }

}
