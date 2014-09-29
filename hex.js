document.ontouchmove = function (e) {
  e.preventDefault()
};

var Hex = function (i, j) {
  this.i = i;
  this.j = j;
}

window.onload = function () {
  var canvas = document.getElementById('game'),
	    ctx = canvas.getContext('2d');

  function drawHex(i, j, selected) {
    ctx.strokeStyle = selected ? 'black' : 'grey';
    ctx.lineWidth = 1;
    ctx.beginPath();

    var t = 30,
        r = t * 0.8660254037,
        x = 20 + r * 2 + (i - (j % 2) / 2.0) * r * 2,
        y = 20 + t + j * t * 1.5;

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

	ctx.clearRect(0, 0, 400, 300);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      drawHex(i, j, i == 0 && j == 0);
    }
  }
};
