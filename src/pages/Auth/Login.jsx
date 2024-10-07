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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          placeholder="Username or Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
