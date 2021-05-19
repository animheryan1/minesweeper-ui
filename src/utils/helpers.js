export const boardSizes = {
  easy: { bombCount: 10, row: 9, col: 9 },
  medium: { bombCount: 40, row: 16, col: 16 },
  hard: { bombCount: 99, row: 30, col: 16 },
};

function formatTime(timeSec) {
  const seconds = timeSec % 60;
  const minutes = Math.floor(timeSec / 60);
  return minutes ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
}

export default formatTime;
