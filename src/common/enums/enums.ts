export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
  }
  
  export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hight = 2,
    Urgently = 3,
    Later = 4,
  }
  

  export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaError = 10,
  }