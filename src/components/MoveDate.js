import React, { useState, useContext } from 'react';
// import icons
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
// import headless ui components
import { Menu } from '@headlessui/react';
// import context 
import { HouseContext } from './HouseContext';

const MoveDate = () => {
  const {date, setDate, dates } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);  // for opening the menu
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className='dropdown-btn w-full text-left'
      >
        <RiHome5Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>
            {date}
          </div>
          <div className='text-[10px]'>Choose Move-in Date  </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {dates.map((date, index) => {
          return (
            <Menu.Item
              as='li'
              onClick={() => setDate(date)}
              key={index}
              className='cursor-pointer hover:text-violet-700 transition'
            >
              {date}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default MoveDate;
