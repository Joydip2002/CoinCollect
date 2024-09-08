import { useState } from "react";
import { addTransactionModal } from "../../interface/interface";

const AddTransaction = ({ isOpen, onClose }: addTransactionModal) => {
    const [isSelect, selectedType] = useState<string>('income');
    const [data,setData]= useState({
        ptype:'income',
        amount:'',
        description:''
    });
    const handleClick = (e) => {
        if(e.target.name=="ptype"){
            selectedType(e.target.value);
        }
        // setData({...data,[e.target.name]:e.target.value});
        setData(prevData=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }
    const formSubmit=(e)=>{
        e.preventDefault();
        setData({
            ptype:'income',
            amount:'',
            description:''
        })
        console.log('====================================');
        console.log(data);
        console.log('====================================');
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
                        <input type="radio" name="ptype" id="income" value="income" onChange={handleClick} />
                        <label htmlFor="income" className={isSelect === 'income' ? 'active transaction_type' : ' transaction_type'}>
                            Income
                        </label>
                        <input type="radio" name="ptype" id="expense" value="expense" onChange={handleClick} />
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
                        <select name="category" required>
                            <option value="food">Food</option>
                            <option value="expense">Icecream</option>
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

