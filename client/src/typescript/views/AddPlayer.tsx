import socket from "../helpers/socket.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPlayer = () => {
  const navigate = useNavigate();

  // ----------------------------------- react hook form -------------------------
  const { register, handleSubmit, setValue } = useForm();
  const [numberOfAttacks, setNumberOfAttacks] = useState(1);

  const setRandomValues = () => {
    console.log("Setting random values");
    setValue("imie", Math.random().toString(36).substring(7));

    let pz = Math.floor(Math.random() * 100);
    setValue("pz", pz);
    setValue("pzMax", pz);

    let pw = Math.floor(Math.random() * 100);
    setValue("pw", pw);
    setValue("pwMax", pw);
    setValue("wigor", Math.floor(Math.random() * 100));
    [
      "glowa",
      "korpus",
      "lewaReka",
      "prawaReka",
      "lewaNoga",
      "prawaNoga",
    ].forEach((part) => {
      let wyparowanie = Math.floor(Math.random() * 10);
      setValue(`wyparowanie.${part}.wyparowanie`, wyparowanie);
      setValue(`wyparowanie.${part}.wyparowanieMax`, wyparowanie);
    });
    [
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
    ].forEach((chance) => {
      setValue(`szanse.${chance}`, Math.floor(Math.random() * 100));
    });
    Array.from({ length: 5 }, (_, index) => {
      setValue(`ataki.${index}.nazwa`, Math.random().toString(36).substring(7));
      setValue(`ataki.${index}.kosztPW`, Math.floor(Math.random() * 100));
      setValue(`ataki.${index}.kosztWigor`, Math.floor(Math.random() * 100));
      setValue(`ataki.${index}.ileD6`, Math.floor(Math.random() * 6) + 1);
      setValue(`ataki.${index}.dodatkowyDMG`, Math.floor(Math.random() * 100));
      setValue(
        `ataki.${index}.nazwaStatystyki`,
        Math.random().toString(36).substring(7),
      );
      setValue(
        `ataki.${index}.mozliweSposobyUniku`,
        Math.random().toString(36).substring(7),
      );
      setValue(`ataki.${index}.srebrnyAtak`, Math.random() < 0.5);
      setValue(
        `ataki.${index}.procentSzansNaPodpalenie`,
        Math.floor(Math.random() * 100),
      );
      setValue(
        `ataki.${index}.procentSzansNaKrwawienie`,
        Math.floor(Math.random() * 100),
      );
    });
  };
  const createCharacter = (data: any) => {
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

    socket.emit("addCharacter", convertedData);
    navigate(-1);
  };

  // @ts-ignore
  return (
    <div className="editPlayerViewWrapper addPlayerViewWrapper">
      <h1>Dodaj postać</h1>
      <form onSubmit={handleSubmit(createCharacter)}>
        <button type="button" onClick={setRandomValues}>
          Ustaw losowe wartości
        </button>
        <div className="hpPw">
          <div>
            <label>Imię:</label>
            <input {...register("imie")} />
          </div>
          <div>
            <label>Czy jest graczem:</label>
            <input type="checkbox" {...register("jestBohaterem")} />
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
            <label>Wigor + focus:</label>
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
              <input type="number" {...register(`szanse.${chance}`)} />
            </div>
          ))}
        </fieldset>
        <div>
          <label>Ile ataków chcesz dodać:</label>
          <input
            type="number"
            value={numberOfAttacks}
            onChange={(e) => setNumberOfAttacks(Number(e.target.value))}
          />
        </div>
        <fieldset className="ataki">
          <legend>Ataki:</legend>
          {Array.from({ length: numberOfAttacks }, (_, index) => (
            <div className="atak">
              <div>
                <label>Nazwa:</label>
                <input {...register(`ataki.${index}.nazwa`)} />
              </div>
              <div>
                <label>Koszt PW:</label>
                <input type="number" {...register(`ataki.${index}.kosztPW`)} />
              </div>
              <div>
                <label>Koszt Wigor:</label>
                <input
                  type="number"
                  {...register(`ataki.${index}.kosztWigor`)}
                />
              </div>
              <div>
                <label>Ile D6 DMG:</label>
                <input type="number" {...register(`ataki.${index}.ileD6`)} />
              </div>
              <div>
                <label>Dodatkowy DMG:</label>
                <input
                  type="number"
                  {...register(`ataki.${index}.dodatkowyDMG`)}
                />
              </div>
              <div>
                <label>Statystyka</label>
                <input {...register(`ataki.${index}.nazwaStatystyki`)} />
              </div>
              {/*<div>*/}
              {/*  <label>Możliwe Sposoby Uniku:</label>*/}
              {/*  <input {...register(`ataki.${index}.mozliweSposobyUniku`)} />*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <label>Srebrny Atak:</label>*/}
              {/*  <input*/}
              {/*    type="checkbox"*/}
              {/*    {...register(`ataki.${index}.srebrnyAtak`)}*/}
              {/*  />*/}
              {/*</div>*/}
              <div>
                <label>Podpalenie szansa: (0-100)</label>
                <input
                  type="number"
                  {...register(`ataki.${index}.procentSzansNaPodpalenie`)}
                />
              </div>
              <div>
                <label>Krwawienie szansa: (0-100)</label>
                <input
                  type="number"
                  {...register(`ataki.${index}.procentSzansNaKrwawienie`)}
                />
              </div>
            </div>
          ))}
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddPlayer;
