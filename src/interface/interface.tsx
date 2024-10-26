import { ReactNode } from "react";

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
    onClose:() => void,
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


export interface TransactionProviderProps {
    children: ReactNode;
}
export interface Transaction {
    id: number;
    amount: number;
    date: string;
    description: string;
}

export interface IncomeExpense {
    income: number;
    expense: number;
}
export interface TransactionApiContextType {
    tdata: Transaction[];
    setRefresh: (value: boolean) => void;
    incomeExpense: IncomeExpense[];
    todayTransaction: Transaction[];
}