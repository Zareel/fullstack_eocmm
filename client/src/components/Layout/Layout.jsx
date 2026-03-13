import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'sonner';

const Layout = ({ title, description, keywords, author }) => {
  return (
    <div>
       {/* <Toaster position="top-right" richColors/> */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Navbar />
      <main className="min-h-[70vh]">
       <Toaster position="top-right" richColors toastOptions={{
        style:{
          width:"300px"
        }
       }}/>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "MarqueZ",
  description: "MERN Stack Ecommerce App",
  keywords: "NodeJS, ExpressJS, ReactJS, HTML, TailwindCSS",
  auther: "Zareel Kalam",
};

export default Layout;
