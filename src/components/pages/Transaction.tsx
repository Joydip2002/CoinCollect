import { useTransactionApi } from "../../context/TransactionContext";
import Transaction_table from "./Transaction_table";
import TransactionCard from "./TransactionCard";

const Transaction = () => {
  const {todayTransaction} = useTransactionApi();
  console.log('====================================');
  console.log(todayTransaction);
  console.log('====================================');
  return (
    <>
        <div className="dashboard_container" style={{overflow:'hidden'}}>
          <p style={{fontSize:'20px',fontWeight:'500'}}>Today Transactions</p>
          <div className="today_transactions_card" style={{marginBottom:'10px',display:'flex', gap:'10px',overflow:'auto'}}>
            {
              todayTransaction?.details?.length>0 ?todayTransaction?.details?.map((data:any)=>(
                <TransactionCard category={data.category??''} type={data.transaction_type??''} amount={data.amount??0}/>
              )):<p>Today don't have any transaction yet</p>
            }
          </div>
          <Transaction_table/>
        </div>
    </>
  )
}

export default Transaction;
