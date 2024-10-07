import { useContext, useEffect } from "react";
import CompetitionContext from "../../context/CompetitionContext";
import CompetitionCard from "../../components/CompetitionCard";

const CompetitionList = () => {
  const { competitions, fetchCompetitions } = useContext(CompetitionContext);

  // Ambil data kompetisi saat komponen ini dirender
  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Daftar Kompetisi</h1>
      {competitions.length === 0 ? (
        <p className="text-gray-600">Belum ada kompetisi.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <CompetitionCard key={competition.competition_id} competition={competition} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
