import food from '../../assets/food.png';
import { DownArrow, UpArrow } from '../../icons/Icons';
import { tansactionCard } from '../../interface/interface';

const incomeStyle={
  background:'#dbfff0',
  color:'green'
}
const expenseStyle={
  background:'#ffe7db',
  color:'red'
}

const TransactionCard = (props:tansactionCard) => {
  const currentStyle = props.type == 'income' ? incomeStyle : expenseStyle;
  return (
    <>
      <div className='tcard_container' style={currentStyle}>
        <div className="tcard">
          {props.category=="food"?
            <img src={food} alt="food"/>
            :''
          }
        </div>
        <div style={{display:'flex',justifyContent:'center',
          alignItems:'center',gap:'4px'
        }}>
          <p>{props.type=="income"?'+':'-'}{props.amount}</p>
          {props.type=="expense" ? <DownArrow/> : <UpArrow />}
        </div>
      </div>
    </>
  )
}

export default TransactionCard
