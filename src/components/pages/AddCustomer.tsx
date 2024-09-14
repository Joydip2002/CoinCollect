import { useState } from "react";
import Button from "./Button";
import { IoIosAddCircle } from "react-icons/io";

const AddCustomer = () => {
    const [customer, setCustomer] = useState({});

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCustomer(prevData=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        console.log('====================================');
        console.log(customer);
        console.log('====================================');
    }
    return (
        <div className="dashboard_container">
            <div className="add-customer-container">
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className="add-customer-label">Name of customer</label>
                    <div className="customer-input-container">
                        <input type="text" name="cname" placeholder="Enter customer name" onChange={handleChange}/>
                    </div>
                    <div>
                        <button className="button-container" style={{display:'flex', border:'1px solid green',background:'#fff',color:'#000',justifyContent:'center',alignItems:'center',gap:'5px'}}>
                            <p>Add</p>
                            <IoIosAddCircle  size='1.2em' color="green"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer;