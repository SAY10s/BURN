class DiceManager {
  static rollD4() {
    return Math.floor(Math.random() * 8) + 1;
  }
  static rollD6() {
    return Math.floor(Math.random() * 6) + 1;
  }
  static rollD10(isCriticalLuckOrFailurePossible = true) {
    let roll = Math.floor(Math.random() * 10) + 1;
    console.log("roll: " + roll);
    if (roll === 10 && isCriticalLuckOrFailurePossible)
      do {
        roll += Math.floor(Math.random() * 10) + 1;
      } while (roll % 10 === 0);
    else if (roll === 1 && isCriticalLuckOrFailurePossible) {
      roll = 0;
      do {
        roll -= Math.floor(Math.random() * 10) + 1;
      } while (roll % 10 === 0);
    }
    return roll;
  }
  static rollD20() {
    let roll = Math.floor(Math.random() * 20) + 1;
    console.log("roll: " + roll);
    if (roll === 20)
      do {
        roll += Math.floor(Math.random() * 20) + 1;
      } while (roll % 20 === 0);
    else if (roll === 1) {
      roll = 0;
      do {
        roll -= Math.floor(Math.random() * 20) + 1;
      } while (roll % 20 === 0);
    }
    return roll;
  }
  static rollD100(isCriticalLuckOrFailurePossible = true) {
    let roll = Math.floor(Math.random() * 100) + 1;
    console.log("roll: " + roll);
    if (roll === 100 && isCriticalLuckOrFailurePossible)
      do {
        roll += Math.floor(Math.random() * 100) + 1;
      } while (roll % 100 === 0);
    else if (roll === 1 && isCriticalLuckOrFailurePossible) {
      roll = 0;
      do {
        roll -= Math.floor(Math.random() * 100) + 1;
      } while (roll % 100 === 0);
    }
    return roll;
  }
}
export default DiceManager;
