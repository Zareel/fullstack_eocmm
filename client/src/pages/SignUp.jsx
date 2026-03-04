import React from "react";
import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <div>
      <Helmet>
        <title>Marques-Signup</title>
      </Helmet>
      <div>
        <h1>Signup</h1>
        <form className="flex flex-col gap-6">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="email" />
            <input type="text" placeholder="email" />
            <input type="Adress" placeholder="email" />
            <select name="" id="">
                <option value="">User</option>
                <option value="">Admin</option>
                <option value="">Moderator</option>
            </select>
            <button>Click here</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
