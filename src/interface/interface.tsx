export interface button{
    type:string,
    text:string,
    visibility:string
}

export interface tansactionCard{
    category:string,
    type:string,
    amount:string
}

export interface addTransactionModal{
    isOpen:boolean,
    onClose?:() => void,
}

export interface signupInterface{
    name:string,
    email:string,
    password:string,
    cpassword:string
}

export interface signinInterface{
    email:string,
    password:string
}