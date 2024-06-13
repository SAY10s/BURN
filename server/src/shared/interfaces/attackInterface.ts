import Character from "../classes/Character.js";

export default interface AttackInterface {
  atakujacy: string | Character; //nazwa postaci ATAKUJĄCEJ po stronie klienta; po stronie serwera obiekt postaci
  obronca: string | Character; //nazwa postaci BRONIĄCEJ SIĘ po stronie klienta; po stronie serwera obiekt postaci
  ileD6: number; //ile D6 jako DMG
  dodatkowyDMG: number; //stała dodatkowa wartość do DMG, np +2
  nazwaAtaku: string; //np, "miecz srebrny", "fireball", "kusza", "pięść"
  kosztPW: number; //koszt PW za użycie ataku, ?ORAZ prawdopoobnie WIGOR wymagany do castowania?
  nazwaStatystyki: string; //nazwa statystyki, która jest używana do ataku
  mozliweSposobyUniku: string[]; //np. ["wyparowanie", "unik", "tarcza"] TODO: spytać Gracjana jakie są możliwe uniki i dodać interface z unikami
  srebrnyAtak: boolean; //czy potwory są na niego wrażliwe (głównie dla miecza srebrnego)
  procentSzansNaPodpalenie: number; //procent szans na podpalenie
  procentSzansNaKrwawienie: number; //procent szans na krwawienie
}
