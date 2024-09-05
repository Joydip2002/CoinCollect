import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Transaction from "./components/pages/Transaction";
import Report from "./components/pages/Report";
import Help from "./components/pages/Help";
import Settings from "./components/pages/Settings";

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
    }
  ]);

  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App;