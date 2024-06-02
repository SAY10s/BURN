import Character from "../helpers/Character.js";

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
          Głowa: {character.wyparowanie.glowa.wyparowanie}/
          {character.wyparowanie.glowa.wyparowanieMax}
        </div>
        <div>
          Korpus: {character.wyparowanie.korpus.wyparowanie}/
          {character.wyparowanie.korpus.wyparowanieMax}
        </div>
        <div>
          Lewa ręka: {character.wyparowanie.lewaReka.wyparowanie}/
          {character.wyparowanie.lewaReka.wyparowanieMax}
        </div>
        <div>
          Prawa ręka: {character.wyparowanie.prawaReka.wyparowanie}/
          {character.wyparowanie.prawaReka.wyparowanieMax}
        </div>
        <div>
          Lewa noga: {character.wyparowanie.lewaNoga.wyparowanie}/
          {character.wyparowanie.lewaNoga.wyparowanieMax}
        </div>
        <div>
          Prawa noga: {character.wyparowanie.prawaNoga.wyparowanie}/
          {character.wyparowanie.prawaNoga.wyparowanieMax}
        </div>
      </div>

      <h3>Szanse:</h3>
      <div className="szanse">
        <div>Unik: {character.szanse.unik}</div>
        <div>Zejście z linii: {character.szanse.zejscieZLini}</div>
        <div>Atak mieczem: {character.szanse.atakMieczem}</div>
        <div>Atak pięścią: {character.szanse.atakPiescia}</div>
        <div>Atak drzewcowa: {character.szanse.atakDrzewcowa}</div>
        <div>Atak bitewna: {character.szanse.atakBitewna}</div>
        <div>Atak krótka: {character.szanse.atakKrotka}</div>
        <div>Atak zaklęciem: {character.szanse.atakZakleciem}</div>
        <div>Strzał z łuku: {character.szanse.strzalZLuku}</div>
        <div>Strzał z kuszy: {character.szanse.strzalZKuszy}</div>
      </div>
    </div>
  );
};

export default CharacterCard;
