import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMediatorCallbacks } from './HttpMediatorCallbacks';

export interface CommandParamsWithPayload<TRequest, TResponse> {
  method: CommandMethodWithPayload<TRequest, TResponse>;
  callbacks: HttpMediatorCallbacks<TResponse>;
  data: TRequest;
}

export interface CommandParamsNoPayload<TRequest, TResponse> {
  method: CommandMethodNoPayload<TResponse>;
  callbacks: HttpMediatorCallbacks<TResponse>;
}

type CommandMethodWithPayload<TRequest, TResponse> = (instance: TRequest) => Observable<TResponse>;
type CommandMethodNoPayload<TResponse> = () => Observable<TResponse>;

@Injectable()
export class HttpMediator {
  constructor(private http: HttpClient) {}

  execWithPayload<TRequest, TResponse>(params: CommandParamsWithPayload<TRequest, TResponse>): void {
    const { method, data, callbacks } = params;
    method.call(null, data).subscribe({
      next: (response: TResponse) => {
        callbacks.success(response);
      },
      error: (error: any) => {
        callbacks.error(error);
      },
    });
  }

  execNoPayload<TRequest, TResponse>(params: CommandParamsNoPayload<TRequest, TResponse>): void {
    const { method, callbacks } = params;
    method.call(null).subscribe({
      next: (response: TResponse) => {
        callbacks.success(response);
      },
      error: (error: any) => {
        callbacks.error(error);
      },
    });
  }
}







//  type CommandClass<TRequest> = new (http: HttpClient) => TRequest;
// type CommandClass<TRequest, TResponse> = new (...args: any[]) => TRequest;










// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpMediatorCallbacks } from './HttpMediatorCallbacks';

// export interface CommandParams<TRequest, TResponse> {
//   commandClass: CommandClass<TRequest>;
//   method: CommandMethod<TRequest, TResponse>;
//   callbacks: HttpMediatorCallbacks<TResponse>;
//   data?: TRequest;
// }

// type CommandMethod<TRequest, TResponse> = (instance?: TRequest) => Observable<TResponse>;

// // Define the CommandClass type
// type CommandClass<TRequest> = new (http: HttpClient) => TRequest;

// @Injectable()
// export class HttpMediator {
//   constructor(private http: HttpClient) {}

//   exec<TRequest, TResponse>(
//     params: CommandParams<TRequest, TResponse>
//   ): void {
//     const { commandClass, method, callbacks, data } = params;

//     const commandInstance = new commandClass(this.http) as TRequest;

//     if (data) {
//       this.execWithPayload(method, commandInstance, data, callbacks);
//     } else {
//       this.execWithoutPayload(method, commandInstance, callbacks);
//     }
//   }

//   private execWithPayload<TRequest, TResponse>(
//     commandMethod: CommandMethod<TRequest, TResponse>,
//     commandInstance: TRequest,
//     data: TRequest,
//     callbacks: HttpMediatorCallbacks<TResponse>
//   ): void {
//     commandMethod.call(commandInstance, data).subscribe({
//       next: (response: any) => {
//         callbacks.success(response);
//       },
//       error: (error: any) => {
//         callbacks.error(error);
//       },
//     });
//   }

//   private execWithoutPayload<TRequest, TResponse>(
//     commandMethod: CommandMethod<TRequest, TResponse>,
//     commandInstance: TRequest,
//     callbacks: HttpMediatorCallbacks<TResponse>
//   ): void {
//     commandMethod.call(commandInstance).subscribe({
//       next: (response: any) => {
//         callbacks.success(response);
//       },
//       error: (error: any) => {
//         callbacks.error(error);
//       },
//     });
//   }
// }








// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpMediatorCallbacks } from './HttpMediatorCallbacks';

// export interface CommandParams<TRequest, TResponse> {
//   commandClass: CommandClass<TRequest>;
//   method: CommandMethod<TRequest, TResponse>;
//   callbacks: HttpMediatorCallbacks<TResponse>;
//   data?: TRequest;
// }

// type CommandMethod<TRequest, TResponse> = (instance?: TRequest) => Observable<TResponse>;

// // Define the CommandClass type
// type CommandClass<TRequest> = new (http: HttpClient) => TRequest;

// @Injectable()
// export class HttpMediator {
//   constructor(private http: HttpClient) {}

//   exec<TRequest, TResponse>(
//     params: CommandParams<TRequest, TResponse>
//   ): void {
//     const { commandClass, method, callbacks, data } = params;

//     const commandInstance = new commandClass(this.http) as TRequest;

//     if (data) {
//       this.execWithPayload(method, commandInstance, data, callbacks);
//     } else {
//       this.execWithoutPayload(method, commandInstance, callbacks);
//     }
//   }

//   private execWithPayload<TRequest, TResponse>(
//     commandMethod: CommandMethod<TRequest, TResponse>,
//     commandInstance: TRequest,
//     data: TRequest,
//     callbacks: HttpMediatorCallbacks<TResponse>
//   ): void {
//     commandMethod.call(commandInstance, data).subscribe({
//       next: (response: any) => {
//         callbacks.success(response);
//       },
//       error: (error: any) => {
//         callbacks.error(error);
//       },
//     });
//   }

//   private execWithoutPayload<TRequest, TResponse>(
//     commandMethod: CommandMethod<TRequest, TResponse>,
//     commandInstance: TRequest,
//     callbacks: HttpMediatorCallbacks<TResponse>
//   ): void {
//     commandMethod.call(commandInstance).subscribe({
//       next: (response: any) => {
//         callbacks.success(response);
//       },
//       error: (error: any) => {
//         callbacks.error(error);
//       },
//     });
//   }
// }






























// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpMediatorCallbacks } from './HttpMediatorCallbacks';

// export interface CommandParams<TRequest, TResponse, T> {
//   commandClass: CommandClass<TRequest, T>;
//   method: CommandMethod<TRequest, TResponse>;
//   callbacks: HttpMediatorCallbacks<TResponse>;
//   data?: TRequest;
// }

// type CommandMethod<TRequest, TResponse> = (instance: TRequest) => Observable<TResponse>;

// // Define the CommandClass type
// type CommandClass<TRequest, T> = new (http: HttpClient) => T;

// @Injectable()
// export class HttpMediator {
//   constructor(private http: HttpClient) {}

//   exec<TRequest, TResponse, T>(
//     params: CommandParams<TRequest, TResponse, T>
//   ): void {
//     const { commandClass, method, callbacks, data } = params;

//     const commandInstance = new commandClass(this.http) as T;
//     const commandMethod = method;

//     if (data) {
//       commandMethod.call(commandInstance, data).subscribe({
//         next: (response: any) => {
//           callbacks.success(response);
//         },
//         error: (error: any) => {
//           callbacks.error(error);
//         },
//       });
//     } else {
//       commandMethod.call(commandInstance).subscribe({
//         next: (response: any) => {
//           callbacks.success(response);
//         },
//         error: (error: any) => {
//           callbacks.error(error);
//         },
//       });
//     }
//   }
// }

