import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Features from "./pages/Features";
import Vendors from "./pages/Vendors";
import About from "./pages/About";
import Contact from "./pages/Contacts/Contact";
import LogIn from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./Components/Dashboard";
import UserDetails from "./Components/UserDetails";
import Settings from "./Components/Settings";
import Support from "./Components/Support";
import Premium from "./Components/Premium";
import { AuthProvider } from "./Context/Authentication_context/AuthContext";
import DisplayVendorsData from "./pages/DisplayVendorsData";
import { LocationProvider } from "./Context/Location_context/LocationContext";
import VendorDetailsPage from "./Components/VendorDetailsPage";

function App() {
  return (
    <>
      <Router>
        <LocationProvider>
          <AuthProvider>
            <Toaster
              position="top-center"
              toastOptions={{ duration: 1000 }}
              reverseOrder={false}
            ></Toaster>
            <Navbar />
            <Routes>
              <Route exact index element={<Home />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/vendors" element={<Vendors />} />
              <Route
                exact
                path="/vendors/:location/:category?/:all?/:subCategory?"
                element={<DisplayVendorsData />}
              />
              <Route
                exact
                path="/vendors/:location/:category?/:all?/:subCategory?/:name?"
                element={<VendorDetailsPage />}
              />
              <Route exact path="/features" element={<Features />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/logIn" element={<LogIn />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/userProfile/" element={<UserProfile />}>
                <Route
                  exact
                  path="/userProfile/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  exact
                  path="/userProfile/personal-Info"
                  element={<UserDetails />}
                />
                <Route
                  exact
                  path="/userProfile/settings"
                  element={<Settings />}
                />
                <Route
                  exact
                  path="/userProfile/support"
                  element={<Support />}
                />
                <Route
                  exact
                  path="/userProfile/premium"
                  element={<Premium />}
                />
              </Route>
            </Routes>
            <Footer />
          </AuthProvider>
        </LocationProvider>
      </Router>
    </>
  );
}

export default App;
