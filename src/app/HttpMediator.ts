import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface HttpMediatorCallbacks<TList> {
  success: (response: TList) => void;
  error: (error: any) => void;
}
export interface CommandParamsWithPayload<TRequest, TResponse> {
  commandClass: CommandClass;
  method: CommandMethodWithPayload<TRequest, TResponse>;
  callbacks: HttpMediatorCallbacks<TResponse>;
  data: TRequest;
}
export interface CommandParamsNoPayload<TResponse> {
  commandClass: CommandClass;
  method: CommandMethodNoPayload<TResponse>;
  callbacks: HttpMediatorCallbacks<TResponse>;
}

type CommandClass = new (http: HttpClient) => any;
type CommandMethodNoPayload<TResponse> = () => Observable<TResponse>;
type CommandMethodWithPayload<TRequest, TResponse> = (data: TRequest) => Observable<TResponse>;

@Injectable()
export class HttpMediator {
  constructor(private http: HttpClient) {}

  execWithPayload<TRequest, TResponse>(
    params: CommandParamsWithPayload<TRequest, TResponse>
  ): void {
    const { commandClass, method, data, callbacks } = params;
    const commandInstance = new commandClass(this.http);

    method.call(commandInstance, data).subscribe({
      next: (response: TResponse) => {
        callbacks.success(response);
      },
      error: (error: any) => {
        callbacks.error(error);
      },
    });
  }

  execNoPayload<TResponse>(
    params: CommandParamsNoPayload<TResponse>
  ): void {
    const { commandClass, method, callbacks } = params;
    const commandInstance = new commandClass(this.http);

    method.call(commandInstance).subscribe({
      next: (response: TResponse) => {
        callbacks.success(response);
      },
      error: (error: any) => {
        callbacks.error(error);
      },
    });
  }
}
