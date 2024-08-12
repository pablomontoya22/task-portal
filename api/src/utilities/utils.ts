class Response {
  public constructor(status: string, data: any, desc?: string) {
    this.status = status
    this.data = data
    this.desc = desc
  }
  status: string = "OK"
  data: any
  desc?: string
  timestamp: number = new Date().getTime()
}

export const responseOk = (data: any): Response => {
  return new Response("OK", data, undefined)
}

export const responseMsgOk = (msg: string): Response => {
  return new Response("OK", undefined, msg)
}

export const responseError = (error: any): Response => {
  return new Response("Error", undefined, error.code || error.message)
}

export const plainObj = (obj: any) => {
  obj = Object.assign({}, obj)
  delete obj.id
  return obj
}