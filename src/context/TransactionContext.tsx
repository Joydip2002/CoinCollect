import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

const TransactionApiContext = createContext();

export const TransactionProvider = ({ children }) => {
    const userId = Number(localStorage.getItem('userId')) || 0;
    const [tdata, setTData] = useState([]);
    const [incomeExpense, setIncomeExpense] = useState([]);
    const [todayTransaction, setTodayTransaction] = useState([]);
    const [isRefresh,setRefresh]=useState(false);

    if(userId > 0){
        const getTransactionList = async () => {
            try {
                const response = await axios.get(`http://localhost:8089/fetchTransactions/${userId}`);
                if(response.data.status==200){
                    setTData(response.data);
                    setRefresh(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        const getIncomeExpenseData=async()=>{
            try {
                const response = await axios.get(`http://localhost:8089/fetchIncomeExpenseDetails/${userId}`);
                if(response.data?.data.status==200){
                    setIncomeExpense(response.data);
                    setRefresh(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
        const todayTransactionDetails=async()=>{
            try {
                const response = await axios.get(`http://localhost:8089/todayTransactionDetails/${userId}`);
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
