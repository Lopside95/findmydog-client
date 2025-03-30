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
import { Toaster } from "./components/ui/sonner";
// import ReportMissing from "./pages/ReportMissing";

export const App = () => {
  const form = useForm();

  return (
    <>
      <FormProvider {...form}>
        <BrowserRouter>
          <Toaster />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/create-post" element={<ReportSighting />} />
            {/* <Route path="/posts/create-post" element={<ReportMissing />} /> */}
            <Route path="/posts/create-post/step-two" element={<StepTwo />} />
            <Route path="/users/signup" element={<SignUp />} />
            <Route path="/users/signin" element={<SignIn />} />
            <Route path="/users/account" element={<Account />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </FormProvider>
    </>
  );
};

export default App;
