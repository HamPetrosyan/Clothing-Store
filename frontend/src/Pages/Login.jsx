import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-customeDarkPurple"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-customeDarkPurple" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-borderPurple placeholder:text-borderPurple focus:outline focus:outline-2 focus:outline-customeDarkPurple focus:border-transparent"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] text-customeNormPurple">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-customeDarkPurple text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
