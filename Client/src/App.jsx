import React, { lazy, Suspence } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoutes from "./components/auth/ProtectRoutes";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chats"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  let user = true;
  return (
    <BrowserRouter>
      <Suspence fallback={<div>...Loading</div>}>
        <Routes>
          <Route element={<ProtectRoutes user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chats />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoutes user={!user} redirect="/">
                <Login />
              </ProtectRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspence>
    </BrowserRouter>
  );
};

export default App;
