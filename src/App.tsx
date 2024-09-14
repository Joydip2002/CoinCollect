import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Transaction from "./components/pages/Transaction";
import Report from "./components/pages/Report";
import Help from "./components/pages/Help";
import Settings from "./components/pages/Settings";
import Signin from "./components/pages/auth/Signin";
import Signup from "./components/pages/auth/Signup";
import NotFound from "./components/pages/NotFound";
import { useEffect } from "react";
import axios from "axios";
import AddCustomer from "./components/pages/AddCustomer";
import AddCategory from "./components/pages/AddCategory";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;


const styles={
  display:'flex'
};
const App=()=>{
  const Layout=()=>{
     const navigate = useNavigate();

    const fetchIdByEmailFunc=async(user:any)=>{
      try {
        const userEmail={
          'email':user
        }
        const fetchId=await axios.post(`${baseUrl}/fetchUserIdByEmail`,userEmail);
        if(fetchId.status==200){
          localStorage.setItem("userId",fetchId.data.data[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      }else{
        fetchIdByEmailFunc(user);
      }
    }, [navigate]);
    return(
      <>
      <div className="" style={styles}>
        <Sidebar/>
        <Outlet/>
      </div>
      </>
    )
  };
  
  const router=createBrowserRouter([
    {
      path:'/login',
      element:<Signin/>
    },
    {
      path:'/register',
      element:<Signup/>
    },
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Dashboard/>
        },
        {
          path:'/transactions',
          element:<Transaction/>
        },
        {
          path:'/addCustomer',
          element:<AddCustomer/>
        },
        {
          path:'/addCategory',
          element:<AddCategory/>
        },
        {
          path:'/report',
          element:<Report/>
        },
        {
          path:'/help',
          element:<Help/>
        },
        {
          path:'/settings',
          element:<Settings/>
        }
      ]
    },
    {
      path:'/*',
      element:<NotFound/>
    }
  ]);

  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App;