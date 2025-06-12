function advance(board) {
  const newBoard = [];
  const isCellLive = cell =>
    board.some(liveCell => liveCell[0] === cell[0] && liveCell[1] === cell[1]);
  const cellIsBorn = (alive, livingNeighbours) =>
    !alive && livingNeighbours.length === 3;
  const cellSurvives = (alive, livingNeighbours) =>
    alive && (livingNeighbours.length === 2 || livingNeighbours.length === 3);

  function evaluateCell(cellX, cellY) {
    const isCellAlive = isCellLive([cellX, cellY]);
    const livingNeighbours = neighbours([cellX, cellY]).filter(isCellLive);
    if (
      cellIsBorn(isCellAlive, livingNeighbours) ||
      cellSurvives(isCellAlive, livingNeighbours)
    ) {
      newBoard.push([cellX, cellY]);
    }
  }

  function traverseRows(cellX) {
    for (let cellY = 0, maxY = 100; cellY < maxY; cellY += 1)
      evaluateCell(cellX, cellY);
  }

  function traverseColumns() {
    for (let cellX = 0, maxX = 100; cellX < maxX; cellX += 1)
      traverseRows(cellX);
  }

  if (cycleMax) {
    traverseColumns();
  } else {
    newBoard.push(...board);
  }

  clearCanvas();
  newBoard.forEach(cell => drawCell.apply(null, cell));
  return newBoard;
}

(_ => (document.querySelector('h1').textContent = 'Brute-force Approach'))();
