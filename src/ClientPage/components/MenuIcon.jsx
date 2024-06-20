import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Importamos los iconos de React

export const MenuIcon = ({ active, toggleMenu }) => {
  return (
    <div onClick={toggleMenu} className="cursor-pointer">
      {active ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
    </div>
  );
};