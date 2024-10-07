import { useContext } from "react";
import AthleteContext from "../../context/AthleteContext";
import AthleteCard from "../../components/AthleteCard";

const AthleteList = () => {
  const { athletes } = useContext(AthleteContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Daftar Atlet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.athlete_id} athlete={athlete} />
        ))}
      </div>
    </div>
  );
};

export default AthleteList;
