import Character from "../helpers/Character.js";
import WyparowaniePasek from "./WyparowaniePasek.tsx";

interface CharacterCardProps {
  character: Character;
}
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const zdrowieProcent = (character.pz / character.pzMax) * 100;
  const wytrzymaloscProcent = (character.pw / character.pwMax) * 100;

  return (
    <div className="character-card">
      <div className="stan">
        <h2 className="name">{character.imie}</h2>

        <div
          className="health-bar-container"
          style={{ width: "100%", backgroundColor: "#ccc" }}
        >
          <div
            className="health-bar"
            style={{ width: `${zdrowieProcent}%`, backgroundColor: "red" }}
          ></div>
          <div className="cyfry">
            {character.pz}/{character.pzMax}
          </div>
        </div>
        <div
          className="health-bar-container"
          style={{ width: "100%", backgroundColor: "#ccc" }}
        >
          <div
            className="health-bar"
            style={{
              width: `${wytrzymaloscProcent}%`,
              backgroundColor: "#149dff",
            }}
          ></div>
          <div className="cyfry">
            {character.pw}/{character.pwMax}
          </div>
        </div>

        {/*<div>Wigor: {character.wigor}</div>*/}
      </div>

      <h3>Wyparowanie:</h3>
      <div className="wyparowanie">
        <div>
          Głowa:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.glowa.wyparowanie}
            wyparowanieMax={character.wyparowanie.glowa.wyparowanieMax}
          />
        </div>
        <div>
          Korpus:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.korpus.wyparowanie}
            wyparowanieMax={character.wyparowanie.korpus.wyparowanieMax}
          />
        </div>
        <div>
          L. ręka:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.lewaReka.wyparowanie}
            wyparowanieMax={character.wyparowanie.lewaReka.wyparowanieMax}
          />
        </div>
        <div>
          P. Ręka:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.prawaReka.wyparowanie}
            wyparowanieMax={character.wyparowanie.prawaReka.wyparowanieMax}
          />
        </div>
        <div>
          L. noga:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.lewaNoga.wyparowanie}
            wyparowanieMax={character.wyparowanie.lewaNoga.wyparowanieMax}
          />
        </div>
        <div>
          P. noga:
          <WyparowaniePasek
            wyparowanie={character.wyparowanie.prawaNoga.wyparowanie}
            wyparowanieMax={character.wyparowanie.prawaNoga.wyparowanieMax}
          />
        </div>
      </div>

      <h3>Szanse:</h3>
      <div className="szanse">
        <div>
          Unik:
          <br /> {character.szanse.unik}
        </div>
        <div>
          Zejście z linii:
          <br /> {character.szanse.zejscieZLini}
        </div>
        <div>
          Atak mieczem:
          <br /> {character.szanse.atakMieczem}
        </div>
        <div>
          Atak pięścią:
          <br /> {character.szanse.atakPiescia}
        </div>
        <div>
          Atak drzewcowa: <br />
          {character.szanse.atakDrzewcowa}
        </div>
        <div>
          Atak bitewna:
          <br /> {character.szanse.atakBitewna}
        </div>
        <div>
          Atak krótka:
          <br /> {character.szanse.atakKrotka}
        </div>
        <div>
          Atak zaklęciem: <br />
          {character.szanse.atakZakleciem}
        </div>
        <div>
          Strzał z łuku: <br />
          {character.szanse.strzalZLuku}
        </div>
        <div>
          Strzał z kuszy:
          <br /> {character.szanse.strzalZKuszy}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
