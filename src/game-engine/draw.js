
export const drawExplosion = (canvas, game) => {
  if (game.isFinished()) {
    if (game.getCrashed()) {
      canvas.drawExplosion(game.getLocation(), 120);
    }
  }
}
export const drawCanvas = (canvas) => {
  canvas.drawGameArea();
}

export const drawCar = (canvas, engine) => {
  const meters = engine.getLocation();

  const input = { xpos: ( meters / 10 )+ 50};
  canvas.drawLander(input);
}
