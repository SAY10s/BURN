import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Character from "../../shared/classes/Character.ts";
import { chooseCharacter } from "../store/CharacterSlice.ts";
import AttackPlayerMenu from "./AttackPlayerMenu.tsx";
// @ts-ignore
import edit from "../../assets/edit.svg";
import StatBar from "./StatBar.tsx";

interface CharacterCardProps {
  character: Character;
  showAttackPlayerMenu: boolean;
  showChooseCharacterButton: boolean;
  showChances: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  showAttackPlayerMenu,
  showChooseCharacterButton,
  showChances = true,
}) => {
  const dispatch = useDispatch();
  const currentCharacter: string = useSelector(
    (state: any) => state.character.currentCharacter,
  );

  const handleChooseCharacter = (characterName: string) => {
    dispatch(chooseCharacter(characterName));
  };

  return (
    <div
      className={
        character.imie === currentCharacter
          ? "character-card current-character"
          : "character-card"
      }
    >
      {currentCharacter === character.imie ? (
        <Link to="/edit">
          <img src={edit} alt={character.imie} width={32} />
        </Link>
      ) : null}
      <div className="stan">
        <h2 className="name">{character.imie}</h2>

        <StatBar
          statValue={character.pz}
          statMax={character.pzMax}
          barColor="red"
        />

        <StatBar
          statValue={character.pw}
          statMax={character.pwMax}
          barColor="#149dff"
        />
      </div>
      <h3>Wyparowanie:</h3>
      <div className="wyparowanie">
        <div>
          Głowa:
          <StatBar
            statValue={character.wyparowanie.glowa.wyparowanie}
            statMax={character.wyparowanie.glowa.wyparowanieMax}
            barColor="green"
          />
        </div>
        <div>
          Korpus:
          <StatBar
            statValue={character.wyparowanie.korpus.wyparowanie}
            statMax={character.wyparowanie.korpus.wyparowanieMax}
            barColor="green"
          />
        </div>
        <div>
          L. ręka:
          <StatBar
            statValue={character.wyparowanie.lewaReka.wyparowanie}
            statMax={character.wyparowanie.lewaReka.wyparowanieMax}
            barColor="green"
          />
        </div>
        <div>
          P. Ręka:
          <StatBar
            statValue={character.wyparowanie.prawaReka.wyparowanie}
            statMax={character.wyparowanie.prawaReka.wyparowanieMax}
            barColor="green"
          />
        </div>
        <div>
          L. noga:
          <StatBar
            statValue={character.wyparowanie.lewaNoga.wyparowanie}
            statMax={character.wyparowanie.lewaNoga.wyparowanieMax}
            barColor="green"
          />
        </div>
        <div>
          P. noga:
          <StatBar
            statValue={character.wyparowanie.prawaNoga.wyparowanie}
            statMax={character.wyparowanie.prawaNoga.wyparowanieMax}
            barColor="green"
          />
        </div>
      </div>
      {showChances && (
        <details>
          <summary>
            <h3>Szanse:</h3>
          </summary>
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
        </details>
      )}

      {showChooseCharacterButton && (
        <button
          onClick={() => {
            handleChooseCharacter(character.imie);
          }}
        >
          Wybierz postać
        </button>
      )}
      {showAttackPlayerMenu && character.imie !== currentCharacter && (
        <AttackPlayerMenu obronca={character.imie} />
      )}
    </div>
  );
};

export default CharacterCard;
