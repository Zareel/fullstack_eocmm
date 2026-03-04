import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Navbar />
     <div className="min-h-[80vh]">
         <Outlet />
     </div>
      <Footer />
    </div>
  );


};

Layout.defaultProps = {
    title:"MarqueZ",
    description:"MERN Stack Ecommerce App",
    keywords:"NodeJS, ExpressJS, ReactJS, HTML, TailwindCSS",
    auther:"Zareel Kalam"
}

export default Layout;
