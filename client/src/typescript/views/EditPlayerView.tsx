import { useDispatch, useSelector } from "react-redux";
import { chooseCharacter } from "../store/CharacterSlice.ts";
import { useEffect, useState } from "react";
import socket from "../helpers/socket.ts";
import { useForm } from "react-hook-form";
import Character from "../../shared/classes/Character.ts";
import { useNavigate } from "react-router-dom";

const EditPlayerView = () => {
  const currentCharacter = useSelector(
    // @ts-ignore
    (state) => state.character.currentCharacter,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let character = localStorage.getItem("currentCharacter");
  if (character) character = JSON.parse(character);
  if (character !== currentCharacter && character)
    dispatch(chooseCharacter(character));

  const [characterToEdit, setCharacterToEdit] = useState<Character>();

  useEffect(() => {
    socket.emit("getCharacterToEdit", currentCharacter);
    socket.on("getCharacterToEditFeedback", (character) => {
      setCharacterToEdit(character);
    });

    // Cleanup socket on unmount
    return () => {
      socket.off("getCharacterToEditFeedback");
    };
  }, [currentCharacter]);

  // ----------------------------------- react hook form -------------------------
  const { register, handleSubmit, reset } = useForm({
    defaultValues: characterToEdit,
  });

  useEffect(() => {
    if (characterToEdit) {
      reset(characterToEdit);
    }
  }, [characterToEdit, reset]);

  const onSubmit = (data: any) => {
    const convertedData = {
      ...data,
      pz: Number(data.pz),
      pzMax: Number(data.pzMax),
      pw: Number(data.pw),
      pwMax: Number(data.pwMax),
      wigor: Number(data.wigor),
      wyparowanie: Object.fromEntries(
        Object.entries(data.wyparowanie).map(([part, values]) => [
          part,
          {
            // @ts-ignore
            wyparowanie: Number(values.wyparowanie),
            // @ts-ignore
            wyparowanieMax: Number(values.wyparowanieMax),
          },
        ]),
      ),
      szanse: Object.fromEntries(
        Object.entries(data.szanse).map(([chance, value]) => [
          chance,
          Number(value),
        ]),
      ),
      // @ts-ignore
      ataki: data.ataki.map((atak) => ({
        ...atak,
        kosztPW: Number(atak.kosztPW),
        kosztWigor: Number(atak.kosztWigor),
        ileD6: Number(atak.ileD6),
        dodatkowyDMG: Number(atak.dodatkowyDMG),
        procentSzansNaPodpalenie: Number(atak.procentSzansNaPodpalenie),
        procentSzansNaKrwawienie: Number(atak.procentSzansNaKrwawienie),
      })),
    };
    console.table(convertedData);

    socket.emit("editCharacter", convertedData);
    navigate(-1);
  };

  // @ts-ignore
  return (
    <div className="editPlayerViewWrapper">
      <h1>Edytuj postać</h1>
      <h2>{currentCharacter}</h2>
      {characterToEdit && (
        <form onSubmit={handleSubmit(onSubmit)} key={characterToEdit.imie}>
          <div className="hpPw">
            <div>
              <label>Imię:</label>
              <input {...register("imie")} />
            </div>
            <div className="field-pair">
              <label>PZ:</label>
              <input type="number" {...register("pz")} />
              <span className="slash">/</span>
              <input type="number" {...register("pzMax")} />
            </div>
            <div className="field-pair">
              <label>PW:</label>
              <input type="number" {...register("pw")} />
              <span className="slash">/</span>
              <input type="number" {...register("pwMax")} />
            </div>
            <div>
              <label>Wigor:</label>
              <input type="number" {...register("wigor")} />
            </div>
          </div>
          <fieldset>
            <legend>Wyparowanie:</legend>
            {[
              "glowa",
              "korpus",
              "lewaReka",
              "prawaReka",
              "lewaNoga",
              "prawaNoga",
            ].map((part) => (
              <div className="field-pair" key={part}>
                <label>{part}:</label>
                <input
                  type="number"
                  {...register(`wyparowanie.${part}.wyparowanie`)}
                />
                <span className="slash">/</span>
                <input
                  type="number"
                  {...register(`wyparowanie.${part}.wyparowanieMax`)}
                />
              </div>
            ))}
          </fieldset>
          <fieldset className="szanse">
            <legend>Szanse:</legend>
            {[
              "unik",
              "zejscieZLini",
              "atakMieczem",
              "atakPiescia",
              "atakDrzewcowa",
              "atakBitewna",
              "atakKrotka",
              "atakZakleciem",
              "strzalZLuku",
              "strzalZKuszy",
            ].map((chance) => (
              <div key={chance}>
                <label>{chance}:</label>
                {/*// @ts-ignore*/}
                <input type="number" {...register(`szanse.${chance}`)} />
              </div>
            ))}
          </fieldset>
          {/*<fieldset>*/}
          {/*  <legend>Ataki:</legend>*/}
          {/*  {characterToEdit.ataki.map((atak, index: number) => (*/}
          {/*    <div key={index}>*/}
          {/*      <label>Nazwa:</label>*/}
          {/*      <input*/}
          {/*        {...register(`ataki.${index}.nazwa`)}*/}
          {/*        defaultValue={atak.nazwa}*/}
          {/*      />*/}
          {/*      <label>Koszt PW:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.kosztPW`)}*/}
          {/*        defaultValue={atak.kosztPW}*/}
          {/*      />*/}
          {/*      <label>Koszt Wigor:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.kosztWigor`)}*/}
          {/*        defaultValue={atak.kosztWigor}*/}
          {/*      />*/}
          {/*      <label>Ile D6:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.ileD6`)}*/}
          {/*        defaultValue={atak.ileD6}*/}
          {/*      />*/}
          {/*      <label>Dodatkowy DMG:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.dodatkowyDMG`)}*/}
          {/*        defaultValue={atak.dodatkowyDMG}*/}
          {/*      />*/}
          {/*      <label>Nazwa Statystyki:</label>*/}
          {/*      <input*/}
          {/*        {...register(`ataki.${index}.nazwaStatystyki`)}*/}
          {/*        defaultValue={atak.nazwaStatystyki}*/}
          {/*      />*/}
          {/*      <label>Możliwe Sposoby Uniku:</label>*/}
          {/*      <input*/}
          {/*        {...register(`ataki.${index}.mozliweSposobyUniku`)}*/}
          {/*        defaultValue={atak.mozliweSposobyUniku.join(", ")}*/}
          {/*      />*/}
          {/*      <label>Srebrny Atak:</label>*/}
          {/*      <input*/}
          {/*        type="checkbox"*/}
          {/*        {...register(`ataki.${index}.srebrnyAtak`)}*/}
          {/*        defaultChecked={atak.srebrnyAtak}*/}
          {/*      />*/}
          {/*      <label>Procent Szans Na Podpalenie:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.procentSzansNaPodpalenie`)}*/}
          {/*        defaultValue={atak.procentSzansNaPodpalenie}*/}
          {/*      />*/}
          {/*      <label>Procent Szans Na Krwawienie:</label>*/}
          {/*      <input*/}
          {/*        type="number"*/}
          {/*        {...register(`ataki.${index}.procentSzansNaKrwawienie`)}*/}
          {/*        defaultValue={atak.procentSzansNaKrwawienie}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</fieldset>*/}
          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default EditPlayerView;
