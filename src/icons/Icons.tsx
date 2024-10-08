import { MdCategory, MdSpaceDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { IoChevronForwardCircleOutline, IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle, IoIosPersonAdd } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const DashboardIcon=()=>{
    return(
        <>
            <MdSpaceDashboard size={'1.5em'}/>
        </>
    )
}
const TransactionIcon=()=>{
    return(
        <>
            <GrTransaction  size={'1.5em'}/>
        </>
    )
}
const ReportIcon=()=>{
    return(
        <>
            <TbReportSearch size={'1.5em'}/>
        </>
    )
}
const SettingIcon=()=>{
    return(
        <>
            <IoSettingsSharp size={'1.5em'}/>
        </>
    )
}
const HelpIcon=()=>{
    return(
        <>
            <IoIosHelpCircle size={'1.5em'}/>
        </>
    )
}
const ChevronIcon=()=>{
    return(
        <>
            <IoChevronForwardCircleOutline />
        </>
    )
}
const UpArrow=()=>{
    return(
        <FaArrowUp />
    )
}
const DownArrow=()=>{
    return(
        <FaArrowDown />
    )
}
const AddCustomerIcon=()=>{
    return(
        <IoIosPersonAdd size={'1.5em'} />
    )
}
const AddCategoryIcon=()=>{
    return(
        <MdCategory size={'1.5em'} />
    )
}
export {DashboardIcon,TransactionIcon,ReportIcon,SettingIcon,HelpIcon,ChevronIcon,UpArrow,DownArrow,AddCustomerIcon,AddCategoryIcon};