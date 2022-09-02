export interface Fornitore {
    piva:string;
    nome:string;
    recapito:string;
    sede:string;
}

export interface Ordine{
    id:number;
    dataConsegna:Date;
    dataCreazione:Date;
    fornitore:Fornitore;
    ordini:R_PO[];
}

export interface R_PO{
    prodotto:Prodotto;
    ordine:Ordine;
    prezzo:number;
    quantita:number;
}

export interface ObjectOrdine{
    dataCreazione:Date;
    dataConsegna:Date;
    piva:string;
    list:helpRPO[];
}

export interface helpRPO{
    prodotto:Prodotto;
    prezzo:number;
    quantita:number;
}

export interface Prodotto{
    id:number;
    nome:string;
    quantita:number;
    tipologia:string;
}

export interface Fornitura{
    pk:{
        piva:string;
        id:number;
    };
    fornitore:Fornitore;
    prodotto:Prodotto;
}

export interface FatturaFornitore{
    id:number;
    data:Date;
    saldato:boolean;
    prezzo:number;
    ordine:Ordine;
}