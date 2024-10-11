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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:px-5 sm:px-5 lg:py-20 sm:py-10">
      {errorMessage && <ErrorDisplay message={errorMessage} />}

      {/* Widget for Total Athletes */}
      <Widget title="Total Athletes" count={athleteCount} icon={<FaRunning />} link="/athletes" color="bg-red-200" />

      {/* Widget for Total Users */}
      <Widget title="Total Users" count={userCount} icon={<FaUser />} link="/users" color="bg-amber-600" />

      {/* Widget for Total Competitions */}
      <Widget title="Total Competitions" count={competitionCount} icon={<FaTrophy />} link="/competitions" color="bg-lime-500" />
    </div>
  );
};

export default Dashboard;
