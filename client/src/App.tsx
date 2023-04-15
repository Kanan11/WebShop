import { Children, ReactElement } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Stores from "./pages/Stores/Stores"
import "./app.scss"
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Success from "./pages/Succsess/Succsess";
import Cancel from "./pages/Cancel/Cancel";
import Checkout from "./pages/Checkout/Checkout";
import Register from "./pages/Users/Register/Register";
import Login from "./pages/Users/Login/Login";
import Restore from "./pages/Users/Restore/Restore";
import Profile from "./pages/Users/Profile/Profile";
import Order from "./pages/Order/Order";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Layout>
      <Home />
    </Layout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
      {
        path: "/products",
        element: <Stores />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/checkout/success",
        element: <Success />,
      },
      {
        path: "/checkout/cancel",
        element: <Cancel />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/restore-password",
        element: <Restore />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
