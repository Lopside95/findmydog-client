import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const [isShown, setIsShown] = useState<boolean>(false);
  const [desktopIsShown, setDesktopIsShown] = useState<boolean>(false);

  const [pageHeader, setPageHeader] = useState<string>("");

  const handleLogOut = async () => {
    localStorage.removeItem("authToken");
    await navigate(`/`);
    setIsShown(false);
    setDesktopIsShown(false);
  };

  const location = useLocation();

  const handleNavigate = async (path: string) => {
    navigate(path);
    setIsShown(false);
    setDesktopIsShown(false);
  };

  return <div>Nav</div>;
};

export default Nav;
