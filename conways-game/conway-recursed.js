function advance(board) {
  let newBoard = [];
  const isCellLive = cell =>
    board.some(liveCell => liveCell[0] === cell[0] && liveCell[1] === cell[1]);
  const cellLife = (alive, livingNeighbours) =>
    livingNeighbours.length === 3 || (alive && livingNeighbours.length === 2);
  const filterDuplicates = unfilteredBoard =>
    Array.from(new Set(unfilteredBoard.map(cell => cell.join())), cell =>
      cell.split(/,/).map(Number)
    );

  function evaluateLivingCellsAndNeighbours(cells, living = true) {
    cells.forEach(cell => {
      const cellNeighbours = neighbours(cell);
      const liveNeighbours = cellNeighbours.filter(isCellLive);

      if (living) {
        if (cellLife(living, liveNeighbours)) newBoard.push(cell);
        evaluateLivingCellsAndNeighbours(cellNeighbours, !living);
      } else if (cellLife(living, liveNeighbours)) newBoard.push(cell);
    });
    return newBoard;
  }

  if (cycleMax) {
    newBoard = filterDuplicates(evaluateLivingCellsAndNeighbours(board));
  } else newBoard.push(...board);

  clearCanvas();
  newBoard.forEach(cell => drawCell.apply(null, cell));
  return newBoard;
}

(_ => (document.querySelector('h1').textContent = 'Recursive Approach'))();
