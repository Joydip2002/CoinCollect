import { Link } from "react-router-dom"
import Button from "../Button"

const Signup = () => {
  return (
    <>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
        <form action="" className="signup-form" style={{background:'#fff',width:'300px', padding:'20px',borderRadius:'10px'}}>
            <h5 style={{fontSize:'18px',marginBottom:'10px'}}>Sign Up</h5>
            <label className="signup-label" htmlFor="">Name</label>
            <input type="text" name="name" placeholder="Enter your name"/>
            <label className="signup-label" htmlFor="">Email</label>
            <input type="email" name="email" placeholder="Enter your email"/>
            <label className="signup-label" htmlFor="">Password</label>
            <input type="password" name="password" placeholder="Enter password" />
            <label className="signup-label" htmlFor="">Confirm Password</label>
            <input type="password" name="password" placeholder="Enter confirm password" />
            <button style={{margin:'10px 0 0 0',width:'100%'}}>Register</button>
            <p  style={{textAlign:'center',fontSize:'12px'}}>Already register? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </>
  )
}

export default Signup
