import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar";
import BoardWritePage from "./pages/BoardWritePage";
import CommunityUpdatePage from "./pages/Community/CommunityUpdatePage/CommunityUpdatePage";
import LandingPage from "./pages/Community/LandingPage/LandingPage";
import MakeCommunityPage from "./pages/Community/MakeCommunityPage/MakeCommunityPage";
import MyPage from "./pages/Community/MyPage/MyPage";
import WritingDetailPage from "./pages/Community/WritingDetailPage/WritingDetailPage";
import WritingUploadPage from "./pages/Community/WritingUploadPage/WritingUploadPage";
import EmailAuthenticationPage from "./pages/EmailAuthenticationPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import RegisterPage from "./pages/RegisterPage";
import TmpPasswordPage from "./pages/TmpPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
const Layout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "calc(100vh)" }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="board/write" element={<BoardWritePage />} />
          <Route path="email/auth" element={<EmailAuthenticationPage />} />
          <Route path="password/reset" element={<PasswordResetPage />} />
          <Route path="tmp/password/:id" element={<TmpPasswordPage />} />
          <Route path="update/password" element={<UpdatePasswordPage />} />
          <Route path="community/make" element={<MakeCommunityPage />} />
          <Route path="community/:id" element={<LandingPage />} />
          <Route
            path="community/:id/writing/upload"
            element={<WritingUploadPage />}
          />
          <Route
            path="community/:id/writing/:wid"
            element={<WritingDetailPage />}
          />
          <Route
            path="community/update/:id"
            element={<CommunityUpdatePage />}
          />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="profile/update" element={<ProfileUpdatePage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
