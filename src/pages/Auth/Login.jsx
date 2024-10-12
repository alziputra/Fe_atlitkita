import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(usernameOrEmail, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5DC] p-5">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-slate-500 border-black border-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-black pb-2 text-[#2c2a29]">Login</h2>
          <div className="form-control mb-4">
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Username or Email"
              className="w-full p-3 border-black border-2 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white focus:bg-[#F4A460] active:shadow-[4px_4px_0px_rgba(0,0,0,1)] placeholder:text-gray-700"
            />
          </div>
          <div className="form-control mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border-black border-2 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white focus:bg-[#F4A460] active:shadow-[4px_4px_0px_rgba(0,0,0,1)] placeholder:text-gray-700"
            />
          </div>
          <button type="submit" className="btn w-full bg-[#A6FAFF] text-gray-700 border-2 border-black p-3 hover:bg-[#79F7FF] hover:text-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
