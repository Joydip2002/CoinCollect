import Chart from 'chart.js/auto'

const Dashboard = () => {
    (async function() {
        const data = [
          { year: 2010, count: 10 },
          { year: 2011, count: 20 },
          { year: 2012, count: 15 },
          { year: 2013, count: 25 },
          { year: 2014, count: 22 },
          { year: 2015, count: 30 },
          { year: 2016, count: 28 },
        ];
      
        new Chart(
          document.getElementById('acquisitions'),
          {
            type: 'bar',
            data: {
              labels: data.map(row => row.year),
              datasets: [
                {
                  label: 'Acquisitions by year',
                  data: data.map(row => row.count)
                }
              ]
            }
          }
        );
      })();
  return (
    <div className="dashboard_container">
      {/* <h3>Dashboard</h3> */}
        <div className="dashborad_card_content">
            <div className="dashboard_card">
                <div className="card">
                    <p>Total Money</p>
                    <h2>RP 25000</h2>
                </div>
                <div className="card">
                    <p>Total Mothly Income</p>
                    <h2>RP 25000</h2>
                </div>
                <div className="card">
                    <p>Total Expense</p>
                    <h2>RP 25000</h2>
                </div>
            </div>
        </div>
        <div>
            <div style={{width: "800"}}><canvas id="acquisitions"></canvas></div>
            <script type="module" src="Charts.tsx"></script>
        </div>
    </div>
  )
}

export default Dashboard;
