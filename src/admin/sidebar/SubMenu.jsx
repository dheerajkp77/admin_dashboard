
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSlider from "../../hooks/useSlider";

const SubMenu = ({ item }) => {
  const slider = useSlider();
  const [subnav, setSubnav] = useState(false);
  const [addClass, setAddClass] = useState("");

  return (
    <>
      <Link
        onMouseEnter={() => {
          setAddClass("nav-hover");
          if (slider) {
            setSubnav(true);
          }
        }}
        onMouseLeave={() => {
          setAddClass("");
          if (slider) {
            setSubnav(false);
          }
        }}
        to={item.path}
        onClick={() => {
          if (!slider && item.subNav) {
            setSubnav(!subnav);
          }
        }}
        className={slider ? addClass :""}
      >
        <span className="value">
          {item.icon}
          <span>{item.title}</span>
        </span>
        <span className="icon">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </span>
      </Link>
      <div className="subnav">
        {subnav &&
          item?.subNav?.map((item, index) => {
            return (
              <Link to={item.path} key={index}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default SubMenu;
