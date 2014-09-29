document.ontouchmove = function (e) {
  e.preventDefault()
};

window.onload = function () {
  var canvas = document.getElementById('game'),
	    ctx = canvas.getContext('2d'),
      currentI = -1, currentJ = -1,
      sqrt3 = 0.8660254037,
      t = 30,
      r = t * sqrt3,
      gridX = 20 + r * 2,
      gridY = 20 + t;

  function drawHex(i, j, selected) {
    ctx.strokeStyle = selected ? 'red' : 'grey';
    ctx.lineWidth = 1;
    ctx.beginPath();

    var x = gridX + (i - (j & 1) * 0.5) * r * 2,
        y = gridY + j * t * 1.5;

    ctx.moveTo(x, y - t);
    ctx.lineTo(x + r, y - t / 2);
    ctx.lineTo(x + r, y + t / 2);
    ctx.lineTo(x, y + t);
    ctx.lineTo(x - r, y + t / 2);
    ctx.lineTo(x - r, y - t / 2);
    ctx.closePath();
    ctx.stroke();

		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		ctx.fillText('(' + i + ',' + j + ')', x, y);
  }

  function render() {
    ctx.clearRect(0, 0, 400, 300);
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 4; j++) {
        drawHex(i, j, i == currentI && j == currentJ);
      }
    }
  }

  render();

  function select(x, y) {
    x -= gridX;
    y -= gridY;

    currentJ = (y + r) / (t * 1.5);
    currentI = (x + r) / (r * 2) + (currentJ & 1) * 0.5;

    currentI = Math.floor(currentI);
    currentJ = Math.floor(currentJ);
    // currentI = (x * sqrt3 - y) / (t * 3);
    // currentJ = (y * 2) / (t * 3);

    // var cx = currentI,
    //     cz = currentJ,
    //     cy = - cx - cz,
    //     rx = Math.round(cx),
    //     ry = Math.round(cy),
    //     rz = Math.round(cz),
    //     dx = Math.abs(cx - rx),
    //     dy = Math.abs(cy - ry),
    //     dz = Math.abs(cz - rz);

    // if (dx > dy && dx > dz) {
    //   rx = - ry - rz;
    // } else if (dy > dz) {
    //   ry = - rx - rz;
    // } else {
    //   rz = - rx - ry;
    // }

    // currentI = rx;
    // currentJ = rz + (rx + (rx & 1)) / 2;

    render();
  }

  canvas.addEventListener('mousemove', function (e) {
    select(e.pageX - canvas.offsetLeft,
           e.pageY - canvas.offsetTop);
  }, false);

  canvas.addEventListener('touchmove', function (e) {
    if (!e) return;

    e.preventDefault();
    select(e.targetTouches[0].pageX - canvas.offsetLeft,
           e.targetTouches[0].pageY - canvas.offsetTop);
  }, true);
};

