import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Product from './pages/Product';
import Features from './pages/Features';
import Services from './Components/Services';
import Wedding from "./Components/Wedding";
import About from './pages/About';
import Contact from './pages/Contacts/Contact';
import SignIn from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import UserProfile from "./Components/Authentication/UserProfile";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 1000 }} reverseOrder={false}></Toaster>
        <Navbar />
        <Routes>
          <Route exact index element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/services/packages/wedding" element={<Wedding />} />
          <Route exact path="/features" element={<Features />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/userProfile/dashboard" element={<UserProfile />}>
            <Route exact path="/userProfile/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
