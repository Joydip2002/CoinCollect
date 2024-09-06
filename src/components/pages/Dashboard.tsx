import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id' // accessor is the key in the data
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Age',
      accessor: 'age'
    }
  ];
  
  const data = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    // Add more data as needed
  ];
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists
      chartRef.current.destroy();
    }
    // Data for the chart
    const data = [
      { year: 2010, count: 25000 },
      { year: 2011, count: 15000 },
      { year: 2012, count: 10000 },
    ];
    // Create the chart
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Expense','Income','Total Money'],
        datasets: [
          {
            label: 'Acquisitions by month',
            data: data.map(row => row.count),
             backgroundColor: ["#FB8282","#FEE69E","#9EFED4"],
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
  }, []);

  return (
    <div className="dashboard_container">
      <div className="dashboard_card_content">
        <div className="dashboard_card">
          <div className="card">
            <p>Total Money</p>
            <h2>RP 10000</h2>
          </div>
          <div className="card">
            <p>Total Monthly Income</p>
            <h2>RP 25000</h2>
          </div>
          <div className="card">
            <p>Total Expense</p>
            <h2>RP 15000</h2>
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
        <div style={{ marginTop:"10px",borderRadius:'10px',background:'#fff',width: " ", height: "350px" }}>
          <canvas ref={canvasRef} id="acquisitions"></canvas>
        </div>
        <div>
        <div className="tansaction-table" style={{ maxHeight:"350px",marginTop:"10px",overflow:'auto'}}>
            <h4>Transaction History</h4>
            {/* <DataTable columns={columns} data={data} /> */}
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Tansactions</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                     
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


