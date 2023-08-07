export interface HttpMediatorCallbacks<TList> {
    success: (response: TList) => void;
    error: (error: any) => void;
  }