import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircle } from "react-icons/io"
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;


const AddCategory = () => {
    const [category, setCategory] = useState({});

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCategory(prevData=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        // console.log('====================================');
        // console.log(category);
        // console.log('====================================');
        const addCategory=await axios.post(`${baseUrl}/addCategory`,category,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log(addCategory);
        if(addCategory?.data?.status==200){
            toast.success(addCategory?.data?.msg);
        }else{
            toast.error(addCategory.data?.msg);
        }
    }
  return (
      <div className="dashboard_container">
            <div className="add-customer-container">
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className="add-customer-label">Name of category</label>
                    <div className="customer-input-container">
                        <input type="text" name="category" placeholder="Enter category name" onChange={handleChange}/>
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

export default AddCategory
