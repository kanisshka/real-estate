import React, { useState, useContext } from "react";
// import icons
import { RiMapPinLine, RiCalendar2Line } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";
// import context
import { HouseContext } from "./HouseContext";

const When = () => {
  const { month, setMonth } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    {
      value: "Choose (any)",
    },
    {
      value: "Sept",
    },
    {
      value: "Oct",
    },
    {
      value: "Nov",
    },
    {
      value: "Dec",
    },
    {
      value: "Jan",
    },
    {
      value: "Feb",
    },
    {
      value: "Mar",
    },
  ];
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{month}</div>
          <div className="text-[13px]">Select Move-in Month</div>
        </div>
        {isOpen ? (
          <RiCalendar2Line className="dropdown-icon-secondary" />
        ) : (
          <RiCalendar2Line className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {months.map((month, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setMonth(month.value)}
              key={index}
              className="cursor-pointer hover:text-violet-700 transition"
            >
              {month.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default When;
