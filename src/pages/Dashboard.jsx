import { useEffect, useState, useCallback } from "react";
import { FaUser, FaRunning, FaTrophy, FaRegListAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import Widget from "../components/Widget";
import ErrorDisplay from "../components/ErrorDisplay";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [athleteData, setAthleteData] = useState([]);
  const [competitionData, setCompetitionData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const refreshAccessToken = async (refreshToken) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await response.json();
    if (data.accessToken) {
      Cookies.set("accessToken", data.accessToken);
    } else {
      throw new Error("Refresh token expired");
    }
  };

  const fetchDataWithAuth = useCallback(async (endpoint) => {
    const token = Cookies.get("accessToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await refreshAccessToken(refreshToken);
        return fetchDataWithAuth(endpoint); // Retry fetch setelah refresh
      } else {
        throw new Error("Unauthorized");
      }
    }
    return response.json();
  }, []); // Gunakan array kosong untuk memastikan `fetchDataWithAuth` tidak berubah

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataUser, dataAthlete, dataCompetition, dataMatch] = await Promise.all([fetchDataWithAuth("users"), fetchDataWithAuth("athletes"), fetchDataWithAuth("competitions"), fetchDataWithAuth("matches")]);

        setUserData(dataUser.data || []);
        setAthleteData(dataAthlete.data || []);
        setCompetitionData(dataCompetition.data || []);
        setMatchData(dataMatch.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setErrorMessage("Failed to fetch data");
      }
    };

    fetchData();
  }, [fetchDataWithAuth]); // Tambahkan `fetchDataWithAuth` sebagai dependensi

  return (
    <div className="flex flex-wrap justify-center items-start py-4 gap-4 lg:gap-8">
      {errorMessage && <ErrorDisplay message={errorMessage} className="w-full mb-4" />}

      {/* Widget for Total Athletes */}
      <Widget title="Total Athletes" data={athleteData ? athleteData.length : 0} icon={<FaRunning />} link="/athletes" color="bg-gradient-to-r from-[#9CDBA6] to-[#468585]" />

      {/* Widget for Total Users */}
      <Widget title="Total Users" data={userData ? userData.length : 0} icon={<FaUser />} link="/users" color="bg-gradient-to-r from-[#E2BBE9] to-[#5A639C]" />

      {/* Widget for Total Competitions */}
      <Widget title="Total Competitions" data={competitionData ? competitionData.length : 0} icon={<FaTrophy />} link="/competitions" color="bg-gradient-to-r from-[#3ABEF9] to-[#6B8A7A]" />

      <Widget title="Total Matches" data={matchData ? matchData.length : 0} icon={<FaRegListAlt />} link="/matches" color="bg-gradient-to-r from-[#FFBF78] to-[#F7418F]" />
    </div>
  );
};

export default Dashboard;
