function advance(board) {
  let newBoard = [];
  const isCellLive = cell =>
    board.some(liveCell => liveCell[0] === cell[0] && liveCell[1] === cell[1]);
  const cellIsBorn = (alive, livingNeighbours) =>
    !alive && livingNeighbours.length === 3;
  const cellSurvives = (alive, livingNeighbours) =>
    alive && (livingNeighbours.length === 2 || livingNeighbours.length === 3);
  const addNeighboursOfLiving = _ =>
    board.reduce(
      (allCells, livingCell) => [...allCells, ...neighbours(livingCell)],
      board
    );
  const getFilteredLivingAndNeighbours = _ =>
    Array.from(
      new Set(addNeighboursOfLiving().map(cell => cell.join())),
      cell => cell.split(/,/).map(Number)
    );

  function evaluateLivingCellsAndNeighbours() {
    const extendedBoard = getFilteredLivingAndNeighbours();
    newBoard = extendedBoard.reduce((liveCells, cell) => {
      const isCellAlive = isCellLive(cell);
      const livingNeighbours = neighbours(cell).filter(isCellLive);
      if (
        cellIsBorn(isCellAlive, livingNeighbours) ||
        cellSurvives(isCellAlive, livingNeighbours)
      ) {
        newBoard.push(cell);
      }
      return newBoard;
    }, []);
  }

  if (cycleMax) {
    evaluateLivingCellsAndNeighbours();
  } else {
    newBoard.push(...board);
  }

  clearCanvas();
  newBoard.forEach(cell => drawCell.apply(null, cell));
  return newBoard;
}

(_ => (document.querySelector('h1').textContent = 'Iterative Approach'))();
