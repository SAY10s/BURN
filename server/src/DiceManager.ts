class DiceManager {
  static rollDice(sides: number, isCriticalLuckOrFailurePossible = true) {
    let roll = Math.floor(Math.random() * sides) + 1;
    if (roll === sides && isCriticalLuckOrFailurePossible) {
      do {
        roll += Math.floor(Math.random() * sides) + 1;
      } while (roll % sides === 0);
    } else if (roll === 1 && isCriticalLuckOrFailurePossible) {
      roll = 0;
      do {
        roll -= Math.floor(Math.random() * sides) + 1;
      } while (roll % sides === 0);
    }
    return roll;
  }

  static rollD4() {
    return Math.floor(Math.random() * 4) + 1;
  }

  static rollD6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  static rollD10(isCriticalLuckOrFailurePossible = true) {
    return this.rollDice(10, isCriticalLuckOrFailurePossible);
  }

  static rollD20() {
    return this.rollDice(20);
  }

  static rollD100(isCriticalLuckOrFailurePossible = true) {
    return this.rollDice(100, isCriticalLuckOrFailurePossible);
  }
}

export default DiceManager;
