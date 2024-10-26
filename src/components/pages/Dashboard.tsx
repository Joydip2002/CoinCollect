import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Transaction_table from './Transaction_table';
import Button from './Button';
// import { useNavigate } from 'react-router-dom';
import { useTransactionApi } from '../../context/TransactionContext';
const Dashboard = () => {
  const {incomeExpense}:any=useTransactionApi();
  const savingMoney = (incomeExpense.data?.details?.income - incomeExpense.data?.details?.expense);
  const checksMoneyValue = savingMoney>0?savingMoney:0;
  const chartRef = useRef<Chart<'bar'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Data for the chart
    const data = [
      { count: checksMoneyValue },
      { count: incomeExpense.data?.details?.income??0 },
      { count: incomeExpense.data?.details?.expense??0 },
    ];
    // Create the chart
    chartRef.current = new Chart(canvasRef.current!, {
      type: 'bar',
      data: {
        labels: ['Total Money','Income','Expense'],
        datasets: [
          {
            label: 'Acquisitions by month',
            data: data.map(row => row.count),
             backgroundColor: ["#9EFED4","#FEE69E","#FB8282"],
            // borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [incomeExpense,checksMoneyValue]);

  return (
    <>
      <div className="dashboard_container dashboard_scrollable">
        <div className="dashboard_card_content">
          <div className="dashboard_card">
            <div className="card">
              <p>Saving Money</p>
              <h2>RP {checksMoneyValue??0}</h2>
            </div>
            <div className="card">
              <p>Total Month's Income</p>
              <h2>RP {incomeExpense.data?.details?.income ?? 0}</h2>
            </div>
            <div className="card">
              <p>Expenses this month</p>
              <h2>RP {incomeExpense.data?.details?.expense?? 0}</h2>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginTop:"10px",padding:'10px',borderRadius:'10px',background:'#fff',}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'ceneter'}}>
              <p style={{fontSize:'20px',color:'#263238',fontWeight:'500'}}>Spending Report</p>
              <Button type="enable" text="View Report" visibility="visible"/>
            </div>
            <div style={{height: "350px" }}>
              <canvas ref={canvasRef} id="acquisitions"></canvas>
            </div>
          </div>
          <div style={{marginTop:'10px'}}>
            <Transaction_table/>
          </div>
        </div>
      </div>
      {/* <AddCustomer/> */}
    </>
  );
};

export default Dashboard;


