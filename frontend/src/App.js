import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer";
import Home from "./component/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact";
import About from "./component/layout/About";
import NotFound from "./component/layout/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    if(isAuthenticated){
      store.dispatch(loadUser());
      getStripeApiKey();
    }

  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" element={Payment} />
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />

        <Route exact path="/products" element={<Products />} />
        
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route exact path='/account' element={<ProtectedRoute/>}>
          <Route exact path='/account' element={<Profile/>}/>
        </Route>

        {/* <Route exact path='/account' element={<ProtectedRoute/>}>
          <Route exact path='/account' element={<Profile/>}/>
        </Route> */}

        {/* <ProtectedRoute exact path="/account" element={<Profile />} /> */}

        <Route exact path="/me/update" element={<ProtectedRoute/>}>
          <Route exact path="/me/update" element={<UpdateProfile/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} /> */}

        <Route exact path="/password/update" element={<ProtectedRoute/>}>
          <Route exact path="/password/update" element={<UpdatePassword/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/password/update" element={<UpdatePassword />} /> */}

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/shipping" element={<ProtectedRoute/>}>
          <Route exact path="/shipping" element={<Shipping/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/shipping" element={<Shipping />} /> */}

        <Route exact path="/success" element={<ProtectedRoute/>}>
          <Route exact path="/success" element={<OrderSuccess/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/success" element={<OrderSuccess />} /> */}

        <Route exact path="/orders" element={<ProtectedRoute/>}>
          <Route exact path="/orders" element={<MyOrders/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/orders" element={<MyOrders />} /> */}

        <Route exact path="/orders/confirm" element={<ProtectedRoute/>}>
          <Route exact path="/orders/confirm" element={<ConfirmOrder/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/order/confirm" element={<ConfirmOrder />} /> */}

        <Route exact path="/orders/:id" element={<ProtectedRoute/>}>
          <Route exact path="/orders/:id" element={<OrderDetails/>}/>
        </Route>

        {/* <ProtectedRoute exact path="/order/:id" element={<OrderDetails />} /> */}

        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
        </Route>

        {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<Dashboard />}
        /> */}

        {/* <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          element={<ProductList />}
        /> */}

        <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/products" element={<ProductList />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          element={<NewProduct />}
        /> */}

        <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/product" element={<NewProduct />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          element={<UpdateProduct />}
        /> */}

        <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/product/:id" element={<UpdateProduct />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          element={<OrderList />}
        /> */}

        <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/orders" element={<OrderList />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          element={<ProcessOrder />}
        /> */}

        <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/order/:id" element={<ProcessOrder />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          element={<UsersList />}
        /> */}

        <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/users" element={<UsersList />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          element={<UpdateUser />}
        /> */}

        <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/user/:id" element={<UpdateUser />}/>
        </Route>

        {/* <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          element={<ProductReviews />}
        /> */}

        <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/reviews" element={<ProductReviews />}/>
        </Route>

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;