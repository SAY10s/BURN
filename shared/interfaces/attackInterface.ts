import Character from "../classes/Character.js";

export default interface AttackInterface {
  atakujacy: string | Character; //nazwa postaci ATAKUJĄCEJ po stronie klienta; po stronie serwera obiekt postaci
  obronca: string | Character; //nazwa postaci BRONIĄCEJ SIĘ po stronie klienta; po stronie serwera obiekt postaci
  ileD6: number; //ile D6 jako DMG
  nazwaAtaku: string; //np, "miecz srebrny", "fireball", "kusza", "pięść"
  kosztPW: number; //koszt PW za użycie ataku, ?ORAZ prawdopoobnie WIGOR wymagany do castowania?
  zaklecie: boolean; //czy to jest zaklęcie
  mozliweSposobyUniku: string[]; //np. ["wyparowanie", "unik", "tarcza"] TODO: spytać Gracjana jakie są możliwe uniki i dodać interface z unikami
  srebrnyAtak: boolean; //czy potwory są na niego wrażliwe (głównie dla miecza srebrnego)
  procentSzansNaPodpalenie: number; //procent szans na podpalenie
}
