import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Transaction from "./components/pages/Transaction";
import Report from "./components/pages/Report";
import Help from "./components/pages/Help";
import Settings from "./components/pages/Settings";
import Signin from "./components/pages/auth/Signin";
import Signup from "./components/pages/auth/Signup";
import NotFound from "./components/pages/NotFound";

const styles={
  display:'flex'
};
const App=()=>{

  const Layout=()=>{
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