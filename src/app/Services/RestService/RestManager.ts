import { HttpClient, HttpErrorResponse } from '@angular/common/http';
export class RestManager {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  makeGetRequest(server_address: string, source_path: string, what: any, callback: any) {
    var request_path: string = source_path + "?";
    for (let source in what) {
      var value = what[source];
      request_path += (source + "=" + value + "&");
    }
    var uri = server_address + request_path.substring(0, request_path.length - 1);
    console.log("URI : " + uri);
    return this.http.get(uri).subscribe({
      next: (response: any) => {
        console.log(response);
        callback(response, true);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        callback(error, false);
      },
    });
  }

  makePutRequest(server_address: string, source_path: string, request_param: any, what:any, callback: any) {
    var request_path: string = source_path + "?";
    for (let source in request_param) {
      var value = request_param[source];
      request_path += (source + "=" + value + "&");
    }
    var uri = server_address + request_path.substring(0, request_path.length - 1);
    console.log("URI : " + uri);
    return this.http.put(
      uri,
      what
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        callback(response, true)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        callback(error, false);
      }
    });
  }

  makePostRequest(server_address: string, source_path: string, request_param: any, what: any, callback: any) {
    var request_path: string = source_path + "?";
    for (let source in request_param) {
      var value = request_param[source];
      request_path += (source + "=" + value + "&");
    }
    var uri = server_address + request_path.substring(0, request_path.length - 1);
    console.log("URI : " + uri);
    return this.http.post(
      uri,
      what
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        callback(response, true);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        callback(error, false);
      }
    });
  }

  makeDeleteRequest(server_address: string, source_path: string, request_param: any, what: any, callback: any) {
    var request_path: string = source_path + "?";
    for (let source in request_param) {
      var value = request_param[source];
      request_path += (source + "=" + value + "&");
    }
    var uri = server_address + request_path.substring(0, request_path.length - 1);
    console.log("URI : " + uri);
    return this.http.delete(
        uri,
        {
            body:what
        }
        ).subscribe({
      next: (response:any)=>{
        callback(response, true);
      },
      error: (error:HttpErrorResponse)=>{
        callback(error, false);
      } 
    })
  }
}