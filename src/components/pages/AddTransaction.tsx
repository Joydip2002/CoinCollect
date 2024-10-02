import { useEffect, useState } from "react";
import { addTransactionModal } from "../../interface/interface";
import axios from "axios";
import toast from "react-hot-toast";
import { useTransactionApi } from "../../context/TransactionContext";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

const AddTransaction = ({ isOpen, onClose }: addTransactionModal) => {
    const userId = localStorage.getItem('userId') ?? 0;
    const { setRefresh } = useTransactionApi();
    const [isSelect, selectedType] = useState<string>('expense');
    const [customer, setCustomerList]=useState<string>();
    const [category, setCategoryList]=useState<string>();
    const [loading,setLoading]=useState<boolean>(false);
    
    const [data, setData] = useState({
        user_id: userId,
        type: 'expense',
        amount: '',
        description: ''
    });
    // console.log(baseUrl);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "type") {
            selectedType(e.target.value);
        }
        // setData({...data,[e.target.name]:e.target.value});
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const formSubmit = async (e: any) => {
        console.log(data);
        setLoading(true);
        e.preventDefault();
        try {
            // const transaction=await fetch("https://e1c9-103-250-109-246.ngrok-free.app/addTansactions",{
            //     method:'post',
            //     headers:{
            //         'Content-Type' : 'application/json'
            //     },
            //     body:JSON.stringify(data)
            // });
            const addtransaction = await axios.post(`${baseUrl}/addTansactions`, data);
            // console.log(addtransaction.data);
            if (addtransaction.data.status == 200) {
                toast.success(addtransaction.data?.msg);
                setData({
                    type: 'expense',
                    amount: '',
                    description: '',
                    user_id: userId
                })
            }
            setLoading(false);
            setRefresh(true);
            onClose();
        } catch (error) {
            console.log(error);
        }

    }
    const fetchCustomerList = async () => {
        try {
            if(userId > 0) {
                // alert(userId);
                const customerListData = await axios.get(`${baseUrl}/fetchCustomerList/${userId}`);
                if(customerListData.status==200){
                   setCustomerList(customerListData.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchCategoryList=async()=>{
        try {
            const categoryListData=await axios.get(`${baseUrl}/fetchCategory`);
            console.log("categoryListDat",categoryListData);
            if(categoryListData.status==200){
                setCategoryList(categoryListData.data);
            }      
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCustomerList();
        fetchCategoryList();
    },[])
    if (!isOpen) return null;
    const animate = isOpen ? 'addAnimate' : '';
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Add Transaction</h2>
                <form onSubmit={formSubmit}>
                    <div style={{ margin: '15px 0' }}>
                        <input type="radio" name="type" id="income" value="income" onChange={handleClick} />
                        <label htmlFor="income" className={isSelect === 'income' ? 'active transaction_type' : ' transaction_type'}>
                            Income
                        </label>
                        <input type="radio" name="type" id="expense" value="expense" onChange={handleClick} />
                        <label htmlFor="expense" className={isSelect === 'expense' ? 'active transaction_type' : ' transaction_type'}>
                            Expense
                        </label>
                    </div>
                    <label>
                        Amount:
                        <input type="number" name="amount" value={data.amount} required onChange={handleClick} />
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: "10px" }}>
                        <label>
                            Customer Name:
                            <select name="customer_id" required onChange={handleClick}>
                                <option value="#">--Select--</option>
                                {
                                        customer && customer.data?.map((d)=>(
                                            <option value={d.id} key={d?.id}>{d?.name}</option>
                                        ))
                                }
                            </select>
                        </label>
                        <label>
                            Category:
                            <select name="category_id" required onChange={handleClick}>
                                <option value="#">--Select--</option>
                                {
                                        category && category.data?.map((d)=>(
                                            <option value={d.id} key={d?.id}>{d?.name}</option>
                                        ))
                                }
                            </select>
                        </label>
                    </div>
                    <label>
                        Description:
                        <textarea name="description" value={data.description} onChange={handleClick} />
                    </label>
                    <button type="submit" style={{display:'flex',justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <p>Add</p>
                        <div className={loading?"spinner-border":""}></div> 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;

