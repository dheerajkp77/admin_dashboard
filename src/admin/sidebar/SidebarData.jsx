
import React from "react";
import * as FaIcons from "react-icons/fa";
export const SidebarData = [
  {
    icon: <FaIcons.FaHome />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <FaIcons.FaUsers />,
    title: "User Management",
    path: "/admin/user-list",
  },
  {
    icon: <FaIcons.FaTshirt />,
    title: "Product Management",
    path: "/admin/product",
  },
  {
    icon: <FaIcons.FaImage />,
    title: "Banner Management",
    path: "/admin/banner-list",
  },
  // {
  //   icon: <FaIcons.FaShoppingCart />,
  //   title: "Order Request",
  //   path: "/admin/order-request",
  // },
  {
    icon: <FaIcons.FaBox />,
    title: "Order Management",
    // path: "/admin/brand-list",
  },
  {
    icon: <FaIcons.FaBox />,
    title: "Payment Management",
    // path: "/admin/brand-list",
  },
  {
    icon: <FaIcons.FaHistory />,
    title: "Logger",
    iconClosed: <FaIcons.FaAngleDown />,
    iconOpened: <FaIcons.FaAngleUp />,

    subNav: [
      {
        icon: <FaIcons.FaQuestion />,
        title: "Error Logs",
        path: "/admin/error-logs",
      },
      {
        icon: <FaIcons.FaEnvelope />,
        title: "Email Queue",
        path: "/admin/email-queue",
      },
      {
        icon: <FaIcons.FaHistory />,
        title: "Login Activity",
        path: "/admin/login-activity",
      },
    ],
  },

  {
    icon: <FaIcons.FaCogs />,
    title: "Settings",
    iconClosed: <FaIcons.FaAngleDown />,
    iconOpened: <FaIcons.FaAngleUp />,

    subNav: [
      {
        icon: <FaIcons.FaEnvira />,
        title: "CMS",
        path: "/admin/cms-list",
      },
      {
        icon: <FaIcons.FaQuestionCircle />,
        title: "FAQ's",
        path: "/admin/faq",
      },
      {
        icon: <FaIcons.FaPaperPlane />,
        title: "Contact Us",
        path: "/admin/contact-us",
      },
    ],
  },
];
