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