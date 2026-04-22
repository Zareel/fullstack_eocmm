import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-8 bg-linear-to-r from-[#A7A7DB] to-stone-400 shadow-md">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
            <div className="flex items-center justify-center  w-12 h-12 rounded-full dark:bg-purple-600">
              <div className="text-4xl font-semibold text-[#100B54] font-mont">
                Marque
                <span className="text-5xl text-[#3226D4] -m-2 font-cursive font-bold">
                  Z
                </span>
              </div>
            </div>
            <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <li>Terms of Use</li>
              <li>Privacy</li>
            </ul>
          </div>
          <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
