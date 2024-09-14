import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signinInterface } from "../../../interface/interface";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../../slice/userSlice";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data:signinInterface) => {
    // console.log(data);
    const response = await dispatch(signin(data));
    if(response.payload?.data?.status==200){
      localStorage.setItem('user',response.payload?.data?.data?.email);
      navigate('/');
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 style={{ fontSize: "18px", marginBottom: "10px" }}>Login</h5>
          <label className="signup-label required" htmlFor="">
            Email
          </label>
          <input
            type="text"
            {...register("email", {
              required: "email is required",
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
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter password"
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
          <button style={{ margin: "10px 0 0 0", width: "100%" }}>Login</button>
          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signin;
