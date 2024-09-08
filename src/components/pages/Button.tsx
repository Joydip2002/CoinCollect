import { useState } from "react";
import { button } from "../../interface/interface";
import AddTransaction from "./AddTransaction";

const Button = (props:button) => {

  const [isOpen,setOpen] = useState<boolean>(false);
  const openModal=()=>{
    setOpen(true);
  }
  const onClose=()=>{
    setOpen(false);
  }

  return (
    <>
    {props.visibility=="visible"?
      <div>
        <button  disabled={props.type!=="enable"} onClick={openModal}>{props.text}</button>
        {props.text!="View Report"?<AddTransaction isOpen={isOpen} onClose={onClose}/>:''}
      </div>
      :''
    }
    </>
  )
}

export default Button;
