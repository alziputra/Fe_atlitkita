import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Widget from "../components/Widget";
import { FaUser, FaRunning, FaTrophy } from "react-icons/fa";

const Dashboard = () => {
  const [athleteCount, setAthleteCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [competitionCount, setCompetitionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Ambil token dari cookies
  const token = Cookies.get("accessToken");

  // Fetch data from API
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/athletes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAthleteCount(res.data.data.length); // Assuming the response is an array of athletes
      } catch (error) {
        console.error("Failed to fetch athletes", error);
        setErrorMessage("Failed to fetch athlete data.");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(res.data.data.length); // Assuming the response is an array of users
      } catch (error) {
        console.error("Failed to fetch users", error);
        setErrorMessage("Failed to fetch user data.");
      }
    };

    const fetchCompetitions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/competitions`, {
          headers: { Authorization: `Bearer ${token}` }, // Sertakan token di header Authorization
        });
        setCompetitionCount(res.data.data.length); // Assuming the response is an array of competitions
      } catch (error) {
        console.error("Failed to fetch competitions", error);
        setErrorMessage("Failed to fetch competition data.");
      }
    };

    fetchAthletes();
    fetchUsers();
    fetchCompetitions();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {errorMessage && <p className="col-span-3 text-red-500">{errorMessage}</p>}

      {/* Widget for Total Athletes */}
      <Widget title="Total Athletes" count={athleteCount} icon={<FaRunning />} />

      {/* Widget for Total Users */}
      <Widget title="Total Users" count={userCount} icon={<FaUser />} />

      {/* Widget for Total Competitions */}
      <Widget title="Total Competitions" count={competitionCount} icon={<FaTrophy />} />
    </div>
  );
};

export default Dashboard;
