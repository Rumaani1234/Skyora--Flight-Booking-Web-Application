// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./Component/Header";
import FlightBooking from "./Booking/FlightBooking";
import Signup from "./Register/Signup";
import SignIn from "./Register/SignIn";
import Payment from "./Payment/Payment";
import FlightCards from "./Flight/FlightCards";
import Destinations from "./Departure/DepartureBoard";
import FlightDetails from "./Details/FlightDetails"; // ✅ Yeh important hai
import About from "./about/About";
import BookingConfirmation from "./Confirmation/BookingConfirmation";
import AadharVerification from "./Verification/AadharVerification";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ForgotPassword from "./password/ForgotPassword";
import ResetPassword from "./password/ResetPassword";
const AppContent = () => {
  const location = useLocation();
const showHeaderRoutes = ["/"];
const shouldShowHeader = showHeaderRoutes.includes(location.pathname);
return (
    <>
      <Navbar />
{shouldShowHeader && <Header />}
<Routes>
        <Route path="/flight-lists" element={<FlightCards />} />
        <Route path="/flight-details" element={<FlightDetails />} />
         <Route path="/booking" element={<FlightBooking />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/flight-lists" element={<FlightCards />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/aadhar-validation" element={<AadharVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;









































































