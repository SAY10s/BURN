import React from "react";
import { Link } from "react-router-dom";
import {
  CharacterAddIcon,
  GmIcon,
  SwordIcon,
  DiceTableIcon,
} from "../../assets/icons.tsx";

const Menu: React.FC = () => {
  let character = localStorage.getItem("currentCharacter");
  if (character) {
    character = character.slice(1, -1);
  } else {
    character = "--???--";
  }

  return (
    <div className="menu">
      <Link to="choose">
        <div className="playerCharacter">
          <div>grasz jako: </div>
          <div>{character}</div>
        </div>
      </Link>
      <div className="header-item">
        <Link to="/dice" className="menu-item">
          <span className="icon dice">
            <DiceTableIcon />
          </span>
          Kości
        </Link>
      </div>
      <div className="header-item">
        <Link to="/add" className="menu-item">
          <span className="icon add">
            <span className="icon dice">
              <CharacterAddIcon />
            </span>
          </span>
          Dodaj postać
        </Link>
      </div>
      <div className="header-item disabled">
        <Link to="/player" className="menu-item">
          <span className="icon player">
            <span className="icon dice">
              <SwordIcon />
            </span>
          </span>
          Bitwa (Gracz)
        </Link>
      </div>

      <div className="header-item disabled">
        <Link to="/gm" className="menu-item">
          <span className="icon gm">
            <span className="icon dice">
              <GmIcon />
            </span>
          </span>
          Bitwa (GM)
        </Link>
      </div>
    </div>
  );
};

export default Menu;
