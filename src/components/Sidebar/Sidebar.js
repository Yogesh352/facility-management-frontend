import { Link, NavLink, useLocation } from "react-router-dom";

import { links } from "./Links";
import { useStateContext } from "../../context/ContextProvider";
import { ClipboardIcon } from "../Icon";
import { Group } from "@mantine/core";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const location = useLocation();

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 mr-10 w-[70%]";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 pr-4 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <>
              <Link to="/dashboard">
                <Group className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                  <ClipboardIcon />

                  <span>FacilityManagement</span>
                </Group>
              </Link>
            </>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>

                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.to}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={() => ({
                      backgroundColor: location.pathname.includes(link.to)
                        ? "#94c0db"
                        : "",
                    })}
                    className={() =>
                      location.pathname.includes(link.to)
                        ? activeLink
                        : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
