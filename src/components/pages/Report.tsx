import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number; 
    };
  }
}
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
const userId:string = localStorage.getItem('userId') ?? "";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  transaction_type: "income" | "expense";
}

interface ReportData {
  status: number;
  customerData: Array<{ id: string; name: string }>;
  data: Transaction[];
}

// Define types for state
interface FormData {
  filter_date: string;
  customer_id: string;
}

const Report = () => {
  const [isSetData, setData] = useState<FormData>({
    filter_date: "",
    customer_id: ""
  });
  const [customerList,setCustomerList]=useState<Array<{ id: string; name: string }> | undefined>();
  const [reportData,setReportData]=useState<ReportData | undefined>();
  const [customerData,setCustomerData]=useState<Array<{ id: string; name: string }> | undefined>();
  // console.log(reportData);
  
  // calculate total sum
  const totalSum=reportData && reportData?.data.reduce((accumulator, transaction) => {
      var operation=transaction.transaction_type=="expense"?-1:+1;
      return accumulator + (operation*transaction.amount);
  }, 0);

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data=await axios.post(`${baseUrl}/fetchTransactionDetailsSingleUser`,isSetData);

    console.log("Form submitted:", data.data.data);
    if(data.data.data?.status==200){
      // console.log("cname",data.data?.data?.customerData[0].name);
      setCustomerData(data.data?.data?.customerData);
      setReportData(data.data?.data);
    }else{
      toast.error("Data not found!")
    }
  };

  const loadCustomerList=async()=>{
    try{
      const datalist=await fetch(`${baseUrl}/fetchCustomerList/${userId}`)
                    .then(respponse=>respponse.json());
                    // .then(data=>console.log(data));
      // console.log(datalist);
      if(datalist.status==200){
        setCustomerList(datalist.data);
      }
      
      
    }catch (error) {
      
    }
  }
  useEffect(()=>{
    loadCustomerList();
  },[])

  // export pdf
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 10);
    doc.text(`Customer Name: ${customerData?.[0]?.name ?? '-'}`, 20, 20);
    
    // Call autoTable method
    autoTable(doc, {
      head: [['#', 'Description', 'Amount']],
      body: reportData?.data?.map((d, i) => [
        i + 1,
        d.description ?? '--',
        d.transaction_type === "expense" ? `- ${d.amount}` : `${d.amount}`,
      ]),
      startY: 30,
    });
  
    doc.text(`Total: ${totalSum}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save('invoice.pdf');
  };

  return (
    <>
      <div className="dashboard_container">
        <h3>Report</h3>
        <div style={{ padding: "20px", background: "#ddd", borderRadius: "5px" }}>
          <form style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
            <select name="customer_id" onChange={handleChange} value={isSetData.customer_id}>
              <option value="">Select Customer</option>
              {
                customerList && customerList.map((list)=>(
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))
              }
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
        <div style={{background:"#fff",color:'#000',margin:"10px 0",maxHeight:"60vh",overflow:"auto"}}>
          <div style={{background:'#FAFDD3',color:"#060270",padding:"10px",display:'flex',justifyContent:"space-between"}}>
            <h3>Invoice-</h3>
            <button onClick={exportPDF}>Export</button>
          </div>
          <div style={{padding:"10px 10px"}}>
            <strong>Name : {customerData?.[0]?.name??'-'}</strong>
            {
              reportData.data?.length>0 && reportData?.data.map((d,i)=>{
                return(
                  <>
                  <div key={d.id} style={{display:'flex', justifyContent:'space-between',padding:"5px"}}>
                    <div style={{display:'flex',gap:'10px'}}>
                      <p>{i+1}</p>
                      <p style={{textAlign:"left"}}>{d.description?d.description:'--'}</p>
                    </div>
                    <p>₹ {d.transaction_type=="expense"? "-" : ""} {d.amount}</p>
                  </div>
                   
                  </>
                )
              })
            }
            <hr />
            <div style={{padding:"15px",display:'flex',justifyContent:'space-between'}}> 
              <p>Total</p>
              <p>₹ {totalSum}</p>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  );
};

export default Report;
