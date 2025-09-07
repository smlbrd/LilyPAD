export function getAgendaColumns(maxScore: number, currentScore: number) {
  return Array.from({ length: currentScore }, (_, index) => ({
    key: index,
    width: `${80 / maxScore}%`,
    height: 10 + index * 10,
  }));
}

export function rollDice(max: number): string | number {
  if (max === 2) {
    return Math.random() < 0.5 ? 'Heads' : 'Tails';
  }

  return Math.floor(Math.random() * max) + 1;
}
