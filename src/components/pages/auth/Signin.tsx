import { Link } from "react-router-dom"

const Signin = () => {
  return (
    <>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
        <form action="" className="signup-form" style={{background:'#fff',width:'300px', padding:'20px',borderRadius:'10px'}}>
            <h5 style={{fontSize:'18px',marginBottom:'10px'}}>Login</h5>
            <label className="signup-label" htmlFor="">Email</label>
            <input type="email" name="email" placeholder="Enter your email"/>
            <label className="signup-label" htmlFor="">Password</label>
            <input type="password" name="password" placeholder="Enter password" />
            <button style={{margin:'10px 0 0 0',width:'100%'}}>Login</button>
            <p style={{textAlign:'center',fontSize:'12px'}}>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </>
  )
}

export default Signin
