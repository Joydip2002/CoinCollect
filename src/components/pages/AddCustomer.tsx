import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
const userId = localStorage.getItem('userId')??0;
const AddCustomer = () => {
    const [customer, setCustomer] = useState({
        customer:""
    });

    // const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    //     setCustomer(prevData=>({
    //         ...prevData,
    //         [e.target.name]:e.target.value
    //     }))
    // }
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        console.log('====================================');
        console.log(customer);
        console.log('====================================');
        const addCustomerData=await axios.post(`${baseUrl}/addCustomer/${userId}`,{customer},{
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log('====================================');
        console.log(addCustomerData.data.data.status);
        console.log('====================================');
        if(addCustomerData?.data?.data?.status == 200){
            toast.success(addCustomerData.data.data?.msg)
        }else{
            toast.error(addCustomerData.data.data?.msg);
        }
        setCustomer({
            customer:""
        });
    }

    return (
        <div className="dashboard_container">
            <div className="add-customer-container">
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className="add-customer-label">Name of customer</label>
                    <div className="customer-input-container">
                        <input type="text" name="customer" placeholder="Enter customer name" onChange={(e:any)=>setCustomer(e.target.value)}/>
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