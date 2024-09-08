import Transaction_table from "./Transaction_table";
import TransactionCard from "./TransactionCard";

const Transaction = () => {
  return (
    <>
        <div className="dashboard_container" style={{overflow:'hidden'}}>
          <p style={{fontSize:'20px',fontWeight:'500'}}>Today Transactions</p>
          <div className="today_transactions_card" style={{marginBottom:'10px',display:'flex', gap:'10px',overflow:'auto'}}>
            <TransactionCard category="food" type="income" amount="50"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
            <TransactionCard category="food" type="expense" amount="500"/>
          </div>
          <Transaction_table/>
        </div>
    </>
  )
}

export default Transaction;
