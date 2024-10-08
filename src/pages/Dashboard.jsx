import { useEffect, useState } from "react";
import { fetchData } from "../utils/useFetchData";
import Widget from "../components/Widget";
import ErrorDisplay from "../components/ErrorDisplay";
import { FaUser, FaRunning, FaTrophy } from "react-icons/fa";

const Dashboard = () => {
  const [athleteCount, setAthleteCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [competitionCount, setCompetitionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const athletes = await fetchData("athletes");
        setAthleteCount(athletes);

        const users = await fetchData("users");
        setUserCount(users);

        const competitions = await fetchData("competitions");
        setCompetitionCount(competitions);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {errorMessage && <ErrorDisplay message={errorMessage} />}

      {/* Widget for Total Athletes */}
      <Widget title="Total Athletes" count={athleteCount} icon={<FaRunning />} link="/athletes" />

      {/* Widget for Total Users */}
      <Widget title="Total Users" count={userCount} icon={<FaUser />} link="/users" />

      {/* Widget for Total Competitions */}
      <Widget title="Total Competitions" count={competitionCount} icon={<FaTrophy />} link="/competitions" />
    </div>
  );
};

export default Dashboard;
