import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupInterface } from "../../../interface/interface";
import { useDispatch } from "react-redux";
import { signup } from "../../../slice/userSlice";
// import axios from "axios";
// const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });
  const formSubmit = (data:signupInterface) => {
    console.log(data);
    try{
      // const register = await axios.post(`${baseUrl}/signup`,data);
      const signupdatat = dispatch(signup(data));
      // console.log(signupdatat);
      navigate('/');
      
    }catch (error) {
      
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <form
          action=""
          className="signup-form"
          style={{
            background: "#fff",
            width: "300px",
            padding: "20px",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit(formSubmit)}
        >
          <h5 style={{ fontSize: "18px", marginBottom: "10px" }}>Sign Up</h5>
          <label className="signup-label required" htmlFor="">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
          />
          {errors.name && <p role="alert">{errors.name.message}</p>}
          <label className="signup-label required" htmlFor="">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
          <label className="signup-label required" htmlFor="">
            Password
          </label>
          <input type="password"
            {...register("password",{required:"Password required"})}
            placeholder="Enter password" 
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
          <label className="signup-label required" htmlFor="">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("cpassword",{required:"Confirm password required"})}
            placeholder="Enter confirm password"
          />
          {errors.cpassword && <p role="alert">{errors.cpassword.message}</p>}
          <button style={{ margin: "10px 0 0 0", width: "100%" }}>
            Register
          </button>
          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Already register? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
