import { BrowserRouter, Route, Routes } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import BottomNav from "./components/BottomNav";
import CreatePost from "./pages/ReportSighting";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/404-NotFound";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import StepTwo from "./pages/StepTwo";
import ReportSighting from "./pages/ReportSighting";
import ReportMissing from "./pages/ReportMissing";
// import CreatePost from "./pages/CreatePost/CreatePost";
// import Nav from "./components/Nav/Nav";
// import Home from "./pages/Home/Home";
// import SignUp from "./pages/Signup/SignUp";
// import Account from "./pages/Account/Account";
// import LogIn from "./pages/Login/LogIn";
// import Footer from "./components/Footer/Footer";
// import SinglePost from "./pages/SinglePost/SinglePost";
// import BackButton from "./components/ui/BackButton/BackButton";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

export const App = () => {
  const form = useForm();

  return (
    <>
      <FormProvider {...form}>
        <BrowserRouter>
          {/* <BackButton />
          <Nav /> */}
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/create-post" element={<ReportSighting />} />
            <Route path="/posts/create-post" element={<ReportMissing />} />
            <Route path="/posts/create-post/step-two" element={<StepTwo />} />
            <Route path="/users/signup" element={<SignUp />} />
            <Route path="/users/signin" element={<SignIn />} />
            <Route path="/users/account" element={<Account />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/posts/create-post" element={<CreatePost />} />
            <Route path="/users/signup" element={<SignUp />} />
            <Route path="/users/login" element={<LogIn />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
          <BottomNav />
          {/* <Footer /> */}
        </BrowserRouter>
      </FormProvider>
    </>
  );
};

export default App;
