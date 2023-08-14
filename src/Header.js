import { useContext } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
import DataContext from "./context/DataContext";

const Header = ({ title }) => {
  const { width } = useContext(DataContext);
  return (
    <header className="header">
      <h1>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Social Media App",
};

export default Header;
