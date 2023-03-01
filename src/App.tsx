import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./Pages/MainPage/MainPage";
import { AdminLogin } from "./Pages/AdminLogin/AdminLogin";
import { PatientForm } from "./Pages/PatientForm/PatientForm";
import { RequireAuth } from "./utils/RequireAuth";
import { AdminAccount } from "./Pages/AdminAccount/AdminAccount";
import { Archive } from "./Pages/Аrchive/Archive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/form" element={<PatientForm />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminAccount />
            </RequireAuth>
          }
        />
        <Route
          path="/archive"
          element={
            <RequireAuth>
              <Archive />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
