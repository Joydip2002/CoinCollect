import { Link, useLocation } from "react-router-dom"
import { DashboardIcon, HelpIcon, ReportIcon, SettingIcon, TransactionIcon } from "../../icons/Icons"
import logo from '../../assets/image-38.jpg';
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const styles2={
    position:'absolute'
};

const Sidebar = () => {
    const location = useLocation();
    // console.log(location.pathname);
    const [isOpen,setOpen] = useState(false);
    
  return (
    <>
        {!isOpen? 
            <div className="sidebar-container">
                <div className="" style={{position:'absolute',display:'flex',justifyContent:'end'}}>
                    <RxCrossCircled />
                </div>
                <div className="dashboard-logo">
                    <img src={logo} alt="" width={50} height={50}/>
                </div>
                <div>
                    <Link to='/' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/'?'active':''}`} >
                            <DashboardIcon/>
                            <div>
                                Dashboard
                            </div>
                        </div>
                    </Link>
                    <Link to='/transactions' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/transactions'?'active':''}`}>
                            <TransactionIcon/>
                            <div className="nav-list">Transactions</div>
                        </div>
                    </Link>
                    <Link to='/report' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/report'?'active':''}`}>
                            <ReportIcon/>
                            <div className="nav-list">Report</div>
                        </div>
                    </Link>
                    <Link to='/settings' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/settings'?'active':''}`}>
                            <SettingIcon />
                            <div className="nav-list">Settings</div>
                        </div>
                    </Link>
                    <Link to='/help' style={{textDecoration:'none',color: '#000'}}>
                    <div className={`sidebar-list-flex ${location.pathname=='/help'?'active':''}`}>
                        <HelpIcon/>
                        <div className="nav-list">Help</div>
                    </div>
                    </Link>
                </div>
            </div>
        :''}
    </>
  )
}

export default Sidebar
