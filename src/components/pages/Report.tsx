import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Report = () => {
  const [isSetData, setData] = useState({
    filter_date: "",
    customer_id: ""
  });
  const [reportData,setReportData]=useState();
  const [customerData,setCustomerData]=useState();
  console.log("reportData",reportData);
  // console.log(customerData);
  
    const totalSum=reportData && reportData?.data.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0);
  // console.log(totalSum);


  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data=await axios.post(`http://localhost:8089/fetchTransactionDetailsSingleUser`,isSetData);

    console.log("Form submitted:", data.data.data);
    if(data.data.data?.status==200){
      // console.log("cname",data.data?.data?.customerData[0].name);
      setCustomerData(data.data?.data?.customerData);
      setReportData(data.data?.data);
    }else{
      toast.error("Data not found!")
    }
  };

  return (
    <>
      <div className="dashboard_container">
        <h3>Report</h3>
        <div style={{ padding: "20px", background: "#ddd", borderRadius: "5px" }}>
          <form style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
            <select name="customer_id" onChange={handleChange} value={isSetData.customer_id}>
              <option value="">Select Customer</option>
              <option value="1">Joydip</option>
              <option value="2">Akash</option>
            </select>
            <input
              type="date"
              name="filter_date"
              className="date"
              onChange={handleChange}
              value={isSetData.filter_date}
            />
            <button type="submit" style={{marginTop:"10px"}}>Search</button>
          </form>
        </div>
        {reportData &&
        <div style={{background:"#fff",color:'#000',margin:"10px 0"}}>
          <h3 style={{background:'#FAFDD3',color:"#060270",padding:"10px"}}>Invoice-</h3>
          <div style={{padding:"10px 10px"}}>
            <strong>Name : {customerData[0].name??'-'}</strong>
            {
              reportData.data?.length>0 && reportData?.data.map((d,i)=>{
                return(
                  <>
                  <div key={d.id} style={{display:'flex', justifyContent:'space-between',padding:"5px"}}>
                    <div style={{display:'flex',gap:'10px'}}>
                      <p>{i+1}</p>
                      <p style={{textAlign:"left"}}>{d.description?d.description:'--'}</p>
                    </div>
                    <p>{d.amount}</p>
                  </div>
                   
                  </>
                )
              })
            }
            <hr />
            <div style={{display:'flex',justifyContent:'space-between'}}> 
              <p>Total</p>
              <p>{totalSum}</p>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  );
};

export default Report;
