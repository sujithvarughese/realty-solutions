import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import {
  AccountVerification,
  AdminAccess,
  adminAccessLoader,
  Error,
  Accounting,
  MyPayments,
  Landing,
  Research,
  Root,
  MyUnit,
  myUnitLoader,
  Messages,
  myMessagesLoader,
  Units,
  unitsLoader,
  FinancesTotal,
  financialSummaryLoader,
} from "./pages";

import {
  FinancesUnit,
  unitFinancialsLoader
} from "./components"


const App = () => {

  // react router for navigation; Root element will contain navigation elements + Outlet to render each page
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "verify", element: < AccountVerification /> },
        { path: "research", element: <Research /> },
        { path: "units", element: <Units />, loader: unitsLoader },
        { path: "home", element: <MyUnit />, loader: myUnitLoader },
        { path: "payments", element: <MyPayments /> },
        { path: "messages", element: <Messages />, loader: myMessagesLoader },
        { path: "admin", element: <AdminAccess />, loader: adminAccessLoader},
        { path: "accounting", element: <Accounting />,
          errorElement: <Error />,
          children: [
            { index: true, element: <FinancesTotal />, loader: financialSummaryLoader },
            { path: ":id", element: <FinancesUnit />, loader: unitFinancialsLoader },
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
