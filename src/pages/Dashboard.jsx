import { useEffect, useState, useCallback } from "react";
import { FaUser, FaRunning, FaTrophy, FaRegListAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import Widget from "../components/Widget";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [athleteData, setAthleteData] = useState([]);
  const [competitionData, setCompetitionData] = useState([]);
  const [matchData, setMatchData] = useState([]);

  const fetchDataWithAuth = useCallback(async (endpoint) => {
    const token = Cookies.get("Token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized"); // Langsung melempar error jika token tidak valid
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
      }
    };

    fetchData();
  }, [fetchDataWithAuth]); // Tambahkan `fetchDataWithAuth` sebagai dependensi

  

  return (
    <div className="flex flex-wrap justify-center items-start py-4 gap-4 lg:gap-8">
      {/* Widget for Total Athletes */}
      <Widget title="Total Athletes" data={athleteData.length} icon={<FaRunning />} link="/athletes" color="bg-gradient-to-r from-[#F97316] to-[#10B981]" />

      {/* Widget for Total Users */}
      <Widget title="Total Users" data={userData.length} icon={<FaUser />} link="/users" color="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />

      {/* Widget for Total Competitions */}
      <Widget title="Total Competitions" data={competitionData.length} icon={<FaTrophy />} link="/competitions" color="bg-gradient-to-r from-[#34D399] to-[#3B82F6]" />

      {/* Widget for Total Matches */}
      <Widget title="Total Matches" data={matchData.length} icon={<FaRegListAlt />} link="/matches" color="bg-gradient-to-r from-[#F87171] to-[#FBBF24]" />
    </div>
  );
};

export default Dashboard;
