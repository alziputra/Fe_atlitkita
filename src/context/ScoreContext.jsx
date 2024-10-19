import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [data, setData] = useState({
    matches: [],
    scores: [],
    loading: false,
    error: null,
  });

  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [showSelectedChoices, setShowSelectedChoices] = useState(false);

  // Fetch data from API
  const fetchData = async (endpoint, key) => {
    const token = Cookies.get("Token");
    if (!token) {
      setData((prevData) => ({
        ...prevData,
        error: "Token is missing",
      }));
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => ({
        ...prevData,
        [key]: response.data.data,
      }));
    } catch (err) {
      setData((prevData) => ({
        ...prevData,
        error: err.message,
      }));
    }
  };

  // Submit scores
  const submitScore = async (match_id, judge_id, athlete_id, scores) => {
    const token = Cookies.get("Token");
    if (!token) {
      setData((prevData) => ({
        ...prevData,
        error: "Token is missing",
      }));
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/scores`,
        {
          match_id,
          judge_id,
          athlete_id,
          ...scores,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prevData) => ({
        ...prevData,
        scores: [...prevData.scores, response.data.data],
      }));
    } catch (err) {
      setData((prevData) => ({
        ...prevData,
        error: err.message,
      }));
    }
  };

  // Handle competition selection
  const handleCompetitionChange = (competitionId) => {
    setSelectedCompetition(competitionId);
    setSelectedAthlete("");
    setShowSelectedChoices(false);
  };

  // Show choices (Athlete selection)
  const handleShowChoices = (matches, selectedAthlete, user, match_id) => {
    const match = matches.find((match) => match.competition_id.toString() === selectedCompetition && (match.athlete1_id.toString() === selectedAthlete || match.athlete2_id.toString() === selectedAthlete));

    if (match) {
      console.log("Judge ID:", user.id); // Mendapatkan judge_id dari user
      console.log("Match ID:", match.match_id); // Mendapatkan match_id
      console.log("Athlete 1 ID:", match.athlete1_id);
      console.log("Athlete 2 ID:", match.athlete2_id);
    }

    setShowSelectedChoices(true);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setData((prevData) => ({ ...prevData, loading: true }));
      await fetchData("scores", "scores");
      await fetchData("athletes", "athletes");
      await fetchData("matches", "matches");
      setData((prevData) => ({ ...prevData, loading: false }));
    };

    fetchAllData();
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        ...data,
        selectedCompetition,
        setSelectedCompetition,
        selectedAthlete,
        setSelectedAthlete,
        showSelectedChoices,
        setShowSelectedChoices,
        submitScore,
        handleCompetitionChange,
        handleShowChoices,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScoreContext;
