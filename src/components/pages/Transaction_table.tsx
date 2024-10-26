import { useTransactionApi } from "../../context/TransactionContext";
import Button from "./Button"

const Transaction_table = () => {
    const { tdata }: { tdata: any } = useTransactionApi()!;
  return (
    <div>
        <div className="tansaction-table" style={{ maxHeight:"350px",overflow:'auto'}}>
            <div className="add_transaction_section">
                <p style={{fontSize:'20px',fontWeight:'500'}}>Transaction History</p>
                <Button type="enable" text="Add Transaction" visibility="visible"/>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        {/* <th colSpan={2}>Action</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tdata.data?.length>0? 
                            tdata?.data?.map((data:any)=>{
                            return (
                                <tr key={data?.id}>
                                    <td>{data?.description}</td>
                                    <td>{data?.id}</td>
                                    <td>{data?.amount}</td>
                                    <td>{new Date(data?.updatedAt).toLocaleDateString()} {new Date(data?.updatedAt).toLocaleTimeString()}</td>
                                    {/* <td>
                                        <button>Delete</button>
                                    </td>
                                    <td>
                                        <button>Edit</button>
                                    </td> */}
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={2}>No transaction found!</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Transaction_table
