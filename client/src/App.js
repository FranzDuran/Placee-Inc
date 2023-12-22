import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CardDetails from "./components/CardDetails/CardsDetail";
import AccountSettings from "./pages/AccountSettings";
import InfoPersonal from "./pages/InfoPersonal";
import Security from "./pages/Security";
import PaymentUser from "./pages/PaymentUser";
import TuristicPost from "./pages/PostTuristic";
import Profile from "./pages/Profile";
import Hostess from "./pages/Hostess";
import PreRegister from "./pages/PreRegister";
import ProfilePublic from "./pages/ProfilePublic";
import DetailPost from "./components/Hostess/DetailPost/DetailPost";
import Start from "./components/Hostess/Start/Start";
import Mywebsite from "./components/Hostess/Mywebsite/Mywebsite";
import Reservations from "./components/Hostess/Reservations/Reservations";
import Historial from "./components/Hostess/Historial/Historial";
import UpdatePhoto from "./components/Hostess/UpdatePhoto/UpdatePhoto";
import Claims from "./components/Hostess/Claims/Claims";
import Admin from "./components/Admin/Admin";
import Comentarios from "./components/Hostess/Comentarios/Comentarios";
import AllComments from "./pages/AllCommtens";
import CheckoutContainer from "./pages/test.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/rooms/:idTuristic" element={<CardDetails />} />
        <Route exact path="/account-settings" element={<AccountSettings />} />
        <Route exact path="/all-comments" element={<AllComments/> } />
        <Route
          exact
          path="/account-settings/personal-info"
          element={<InfoPersonal />}
        />
        <Route
          exact
          path="/account-settings/login-and-security"
          element={<Security />}
        />
        <Route
          exact
          path="/account-settings/payment-methods"
          element={<PaymentUser />}
        />
        <Route exact path="/public" element={<TuristicPost />} />
        <Route exact path="/user/show" element={<Profile />} />

        <Route exact path="/preregister" element={<PreRegister />} />
        <Route exact path="/public/profile" element={<ProfilePublic />} />

        <Route  path="/test" element={<CheckoutContainer />} />
        <Route path="/anfitrion" element={<Hostess />}>
          <Route index element={<Start />} />
          <Route path="inicio" element={<Start />} />
          <Route path="mi sitio" element={<Mywebsite />} />
          <Route path="mi sitio/:postId" element={<DetailPost />} />
          <Route path="reservaciones" element={<Reservations />} />
          <Route path="historial de reservas" element={<Historial />} />
          <Route path="historial de reservas/fotos" element={<UpdatePhoto />} />
          <Route path="reclamos" element={<Claims />} />
          <Route path="comentarios" element={<Comentarios />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          {/*    <Route index element={<Start />} />
          <Route path="inicio" element={<Start />} />
          <Route path="mi sitio" element={<Mywebsite />} />
          <Route path="mi sitio/:postId" element={<DetailPost />} />
          <Route path="reservaciones" element={<Reservations />} />
          <Route path="historial de reservas" element={<Historial />} />
          <Route path="historial de reservas/fotos" element={<UpdatePhoto />} />
          <Route path="reclamos" element={<Claims />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
