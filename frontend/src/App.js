import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Product from './Components/Product';
import Features from './Components/Features';
import Services from './Components/Services/Services';
import Wedding from "./Components/Services/Packages/Wedding";
import About from './Components/About';
import Contact from './Components/Contacts/Contact';
import SignIn from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
// import UserDetails from './Components/Authentication/UserDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact index element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/services/packages/wedding" element={<Wedding/>} />
          <Route exact path="/features" element={<Features />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          {/* <Route exact path="/signIn" element={<SignIn />} /> */}
          {/* <Route exact path="/signUp" element={<SignUp />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
