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
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-5">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="form-control mb-4">
            <input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} placeholder="Username or Email" className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
