import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { IncomeExpense, TransactionApiContextType, TransactionProviderProps } from "../interface/interface";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

const TransactionApiContext = createContext<TransactionApiContextType|null>(null);

export const TransactionProvider = ({ children }:TransactionProviderProps) => {
    const userId = Number(localStorage.getItem('userId')) || 0;
    const [tdata, setTData] = useState<[]>([]);
    const [incomeExpense, setIncomeExpense] = useState<IncomeExpense[]>([]);
    const [todayTransaction, setTodayTransaction] = useState([]);
    const [isRefresh,setRefresh]=useState<boolean>(false);

    if(userId > 0){
        const getTransactionList = async () => {
            try {
                const response = await axios.get(`${baseUrl}/fetchTransactions/${userId}`);
                if(response.data.status==200){
                    // console.log('====================================');
                    // console.log("jshcds",response.data);
                    // console.log('====================================');
                    setTData(response.data);
                    setRefresh(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        const getIncomeExpenseData=async()=>{
            try {
                const response = await axios.get(`${baseUrl}/fetchIncomeExpenseDetails/${userId}`);
                if(response.data?.data.status==200){
                    // console.log('====================================');
                    // console.log("incomeExpense"+response?.data);
                    // console.log('====================================');
                    setIncomeExpense(response.data);
                    setRefresh(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
        const todayTransactionDetails=async()=>{
            try {
                const response = await axios.get(`${baseUrl}/todayTransactionDetails/${userId}`);
                if(response.data?.data?.status==200){
                    setTodayTransaction(response.data?.data);
                    setRefresh(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
    
        useEffect(() => {
            getTransactionList();
            getIncomeExpenseData();
            todayTransactionDetails();
        }, [userId,isRefresh]);
    }

    return (
        <TransactionApiContext.Provider value={{ tdata,setRefresh,incomeExpense,todayTransaction}}>
            {children}
        </TransactionApiContext.Provider>
    );
};

export function useTransactionApi() {
    return useContext(TransactionApiContext);
}
