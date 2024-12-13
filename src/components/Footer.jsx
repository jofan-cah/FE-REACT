import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-2  mt-auto">
      <p>&copy; {new Date().getFullYear()} My Dashboard. All Rights Reserved.</p>
    </footer>
  );
};


export default Footer;
