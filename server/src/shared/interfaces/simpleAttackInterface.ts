import Character from "../classes/Character";

export default interface AttackInterface {
  atakujacy: string | Character; //nazwa postaci ATAKUJĄCEJ po stronie klienta; po stronie serwera obiekt postaci
  obronca: string | Character; //nazwa postaci BRONIĄCEJ SIĘ po stronie klienta; po stronie serwera obiekt postaci
  ileD6: number; //ile D6 jako DMG
  dodatkowyDMG: number;
  nazwaAtaku: string; //np, "miecz srebrny", "fireball", "kusza", "pięść"
  procentSzansNaPodpalenie: number; //procent szans na podpalenie
  procentSzansNaKrwawienie: number; //procent szans na krwawienie
}
