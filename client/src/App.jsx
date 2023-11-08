import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import {
  Error,
  Accounting,
  Finances,
  Payments,
  Landing,
  Login,
  Register,
  Rents,
  rentsLoader,
  Research,
  Root,
  MyUnit,
  myUnitLoader,
  Messages,
  myMessagesLoader,
  Units,
  unitsLoader,
} from "./pages";


const App = () => {

  // react router for navigation; Root element will contain navigation elements + Outlet to render each page
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "research", element: <Research /> },
        { path: "units", element: <Units />, loader: unitsLoader },
        { path: "home", element: <MyUnit />, loader: myUnitLoader},
        { path: "payments", element: <Payments /> },
        { path: "messages", element: <Messages />, loader: myMessagesLoader},
        { path: "accounting",
          element: <Accounting />,
          errorElement: <Error />,
          children: [
            { index: false },
            { path: "finances", element: <Finances /> },
            { path: "rents", element: <Rents />, loader: rentsLoader},
          ]
        }
      ]
    }
  ])

  return (
     <GlobalProvider>
         <RouterProvider router={router} />
     </GlobalProvider>
  )
}

export default App
