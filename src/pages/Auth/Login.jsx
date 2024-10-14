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
    <div className="hero bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2] min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Sekarang!</h1>
          <p className="py-6">
            Aplikasi **ATLIT KITA** digunakan untuk menilai pertandingan antara dua atlet. Beberapa juri memberikan skor terpisah untuk masing-masing atlet, dan setelah semua penilaian selesai, hasil pertandingan disimpan dengan skor
            akumulatif. Aplikasi ini memudahkan juri dalam memberikan penilaian dan membantu pengelola mengakses hasil pertandingan secara efisien.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-[#2E4053] border-0 shadow-[6px_6px_0px_rgba(0,0,0,0.6)]">
          <div className="card-body p-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email/username</span>
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Username or Email"
                className="w-full p-3 border-[#212121] border-2 rounded-md focus:outline-none focus:shadow-[4px_4px_0px_rgba(33,33,33,1)] bg-[#f0f0f0] focus:bg-[#ffe1b6] active:shadow-[4px_4px_0px_rgba(33,33,33,1)] placeholder:text-gray-600"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border-[#212121] border-2 rounded-md focus:outline-none focus:shadow-[4px_4px_0px_rgba(33,33,33,1)] bg-[#f0f0f0] focus:bg-[#ffe1b6] active:shadow-[4px_4px_0px_rgba(33,33,33,1)] placeholder:text-gray-600"
              />
            </div>
            <div className="form-control mt-8">
              <button type="submit" className="btn w-full bg-[#00adb5] text-white border-2 border-[#212121] p-3 rounded-md hover:bg-[#00c2d9] hover:text-white focus:shadow-[4px_4px_0px_rgba(33,33,33,1)]">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
