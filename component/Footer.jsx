import React from "react";

const Footer = () => {
  return (
    <footer className="">
    <div className="flex flex-col bg-slate-800 text-white justify-center items-center">
      <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className="flex justify-center font-bold items-center">
        created with <img className="w-7 " src="icon/heart.png" alt="" /> by abhi jain
      </div>
    </div>
    </footer>
  );
};

export default Footer;
