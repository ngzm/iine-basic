export const required = (v: any) => !!v

export const maximunLength = (maximum: number) => ((v: string) => v.length <= maximum)
export const minimumLength = (minimum: number) => ((v: string) => v.length >= minimum)

export const emailValidator = (v: string) => {
  const format =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return v ? format.test(v) : true
}

export const phoneValidator = (v: string) => {
  const format = /^\d{2,5}-\d{1,4}-\d{4}$/
  return v ? format.test(v) : true
}
