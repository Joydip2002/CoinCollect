import { Link, useLocation, useNavigate } from "react-router-dom"
import { AddCategoryIcon, AddCustomerIcon, ChevronIcon, DashboardIcon, HelpIcon, ReportIcon, SettingIcon, TransactionIcon } from "../../icons/Icons"
import logo from '../../assets/image-38.jpg';
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import useWindowWidth from "../../hooks/useWindowWidth";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
    const location = useLocation();
    const width = useWindowWidth();
    const navigate=useNavigate();
    const [isOpen, setOpen] = useState(true);
    const toggleSidebar = () => {
        setOpen(!isOpen);
    }
    const logoutUser=()=>{
        localStorage.clear();
        navigate("/login");
    }
    useEffect(() => {
        if (width <= 768) {
            setOpen(false);
        }
    }, [width])
    // if(!localStorage.getItem('user')){
    //     return;
    // }
    return (
        <>
            {/* {isOpen?  */}
            <div className="sidebar-container" style={{ width: isOpen ? '300px' : '60px' }}>
                <div>
                    <div className="cross-sidebar-icon" onClick={toggleSidebar}>
                        {width > 768 ? isOpen ? <RxCrossCircled /> : <ChevronIcon /> : ''}
                    </div>
                    <div className="dashboard-logo">
                        <img src={logo} alt="" width={50} height={50} style={{ borderRadius: '50%' }} />
                    </div>
                    <div>
                        <Link to='/' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/' ? 'active' : ''}`} >
                                <DashboardIcon />
                                {isOpen ? <div>
                                    Dashboard
                                </div> : ''}
                            </div>
                        </Link>
                        <Link to='/transactions' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/transactions' ? 'active' : ''}`}>
                                <TransactionIcon />
                                {isOpen ? <div className="nav-list">Transactions</div> : ''}
                            </div>
                        </Link>
                        <Link to='/addCustomer' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/addCustomer' ? 'active' : ''}`}>
                                <AddCustomerIcon />
                                {isOpen ? <div className="nav-list">Add Customers</div> : ''}
                            </div>
                        </Link>
                        <Link to='/addCategory' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/addCategory' ? 'active' : ''}`}>
                                <AddCategoryIcon />
                                {isOpen ? <div className="nav-list">Add Category</div> : ''}
                            </div>
                        </Link>
                        <Link to='/report' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/report' ? 'active' : ''}`}>
                                <ReportIcon />
                                {isOpen ? <div className="nav-list">Report</div> : ''}
                            </div>
                        </Link>
                        <Link to='/settings' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/settings' ? 'active' : ''}`}>
                                <SettingIcon />
                                {isOpen ? <div className="nav-list">Settings</div> : ''}
                            </div>
                        </Link>
                        <Link to='/help' style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={`sidebar-list-flex ${location.pathname == '/help' ? 'active' : ''}`}>
                                <HelpIcon />
                                {isOpen ? <div className="nav-list">Help</div> : ''}
                            </div>
                        </Link>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', background: "#ddd", padding: "10px"}}>
                    <IoLogOutOutline style={{ fontSize: "1.5em",cursor:"pointer"}} onClick={logoutUser}/>
                </div>
            </div>
            {/* :''} */}
        </>
    )
}

export default Sidebar
