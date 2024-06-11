import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
   
      {/* <Footer /> */}
    </>
  );
};

export default Main;
