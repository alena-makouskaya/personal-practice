
export type BaseResponseType<D ={}> = {
    data: D
    resultCode: number
    messages: Array<string>
}