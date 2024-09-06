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
    const [isOpen,setOpen] = useState(true);
    const toggleSidebar=()=>{
        setOpen(!isOpen);
    }
  return (
    <>
        {/* {isOpen?  */}
        <div className="sidebar-container" style={{ width: isOpen ? '300px' : '60px' }}>
                <div className="cross-sidebar-icon" onClick={toggleSidebar}>
                    <RxCrossCircled />
                </div>
                <div className="dashboard-logo">
                    <img src={logo} alt="" width={50} height={50}/>
                </div>
                <div>
                    <Link to='/' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/'?'active':''}`} >
                            <DashboardIcon/>
                            {isOpen? <div>
                                Dashboard
                            </div>:''}
                        </div>
                    </Link>
                    <Link to='/transactions' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/transactions'?'active':''}`}>
                            <TransactionIcon/>
                            {isOpen? <div className="nav-list">Transactions</div>:''}
                        </div>
                    </Link>
                    <Link to='/report' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/report'?'active':''}`}>
                            <ReportIcon/>
                            {isOpen? <div className="nav-list">Report</div>:''}
                        </div>
                    </Link>
                    <Link to='/settings' style={{textDecoration:'none',color: '#000'}}>
                        <div className={`sidebar-list-flex ${location.pathname=='/settings'?'active':''}`}>
                            <SettingIcon />
                            {isOpen? <div className="nav-list">Settings</div>:''}
                        </div>
                    </Link>
                    <Link to='/help' style={{textDecoration:'none',color: '#000'}}>
                    <div className={`sidebar-list-flex ${location.pathname=='/help'?'active':''}`}>
                        <HelpIcon/>
                        {isOpen? <div className="nav-list">Help</div>:''}
                    </div>
                    </Link>
                </div>
            </div>
        {/* :''} */}
    </>
  )
}

export default Sidebar
