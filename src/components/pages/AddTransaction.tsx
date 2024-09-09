import { useState } from "react";
import { addTransactionModal } from "../../interface/interface";
import axios from "axios";
import toast from "react-hot-toast";

const AddTransaction = ({ isOpen, onClose }: addTransactionModal) => {
    const [isSelect, selectedType] = useState<string>('income');
    const [data,setData]= useState({
        user_id:3,
        type:'income',
        amount:'',
        description:''
    });
    const handleClick = (e) => {
        if(e.target.name=="type"){
            selectedType(e.target.value);
        }
        // setData({...data,[e.target.name]:e.target.value});
        setData(prevData=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }
    const formSubmit=async(e)=>{
        console.log(data);
        e.preventDefault();
        try{
            // const transaction=await fetch("https://e1c9-103-250-109-246.ngrok-free.app/addTansactions",{
            //     method:'post',
            //     headers:{
            //         'Content-Type' : 'application/json'
            //     },
            //     body:JSON.stringify(data)
            // });
            const addtransaction=await axios.post("https://e1c9-103-250-109-246.ngrok-free.app/addTansactions",data);
            console.log(addtransaction.data);
            if(addtransaction.data.status==200){
                toast.success(addtransaction.data?.msg);
                setData({
                    type:'income',
                    amount:'',
                    description:'',
                    user_id:3
                })
            }
            onClose();
        }catch (error) {
            console.log(error);
        }
        
    }

    if (!isOpen) return null;
    const animate=isOpen?'addAnimate':'';
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Add Transaction</h2>
                <form onSubmit={formSubmit}>
                    <div style={{margin:'15px 0'}}>
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
                        <input type="number" name="amount" value={data.amount} required onChange={handleClick}/>
                    </label>
                    <label>
                        Category:
                        <select name="category" required onChange={handleClick}>
                            <option value="food">Food</option>
                            <option value="icecream">Icecream</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={data.description} onChange={handleClick}/>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;

