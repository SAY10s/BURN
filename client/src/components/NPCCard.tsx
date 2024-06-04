import Character from "../shared/classes/Character.js";
import { useSelector } from "react-redux";
import AttackPlayerMenu from "./AttackPlayerMenu.tsx";

interface CharacterCardProps {
  character: Character;
}
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const zdrowieProcent = (character.pz / character.pzMax) * 100;

  const currentCharacter = useSelector(
    (state: any) => state.character.currentCharacter,
  );

  let statusColor = "black";
  if (zdrowieProcent === 100) {
    statusColor = "#008000";
  }
  if (zdrowieProcent < 99) {
    statusColor = "#03fc2c";
  }
  if (zdrowieProcent <= 75 && zdrowieProcent > 50) {
    statusColor = "#ffff00";
  }
  if (zdrowieProcent <= 50 && zdrowieProcent > 25) {
    statusColor = "#FFA500";
  }
  if (zdrowieProcent <= 25) {
    statusColor = "#ff0000";
  }
  if (zdrowieProcent <= 0) {
    statusColor = "#777777";
  }

  return (
    <div
      className="character-card"
      style={{
        backgroundColor: character.imie === currentCharacter ? "black" : "",
      }}
    >
      <div className="stan">
        <h2 className="name">{character.imie}</h2>

        <div
          className="health-bar-container"
          style={{ width: "100%", backgroundColor: statusColor }}
        ></div>
      </div>

      <AttackPlayerMenu obronca={character.imie} />
    </div>
  );
};

export default CharacterCard;
