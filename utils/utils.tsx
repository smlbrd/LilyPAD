export function getAgendaColumns(maxScore: number, currentScore: number) {
  return Array.from({ length: currentScore }, (_, index) => ({
    key: index,
    width: `${80 / maxScore}%`,
    height: 10 + index * 10,
  }));
}
