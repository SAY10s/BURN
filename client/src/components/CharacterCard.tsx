import Character from "../helpers/Character.js";

interface CharacterCardProps {
  character: Character;
}
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character-card">
      <h2 className="name">{character.imie}</h2>
      <div>
        Punkty zdrowia: {character.pz}/{character.pzMax}
      </div>
      <div>
        Punkty wytrzymałości: {character.pw}/{character.pwMax}
      </div>
      <div>Wigor: {character.wigor}</div>
      <h3>Wyparowanie:</h3>
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
      <h3>Szanse:</h3>
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
  );
};

export default CharacterCard;
