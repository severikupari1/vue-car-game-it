function drawGameArea() {
    var el = document.getElementById("gamecanvas");
    var ctx = el.getContext("2d");
    var yoff = 150;
    //
    ctx.clearRect(0, 0, 1000,500);

    ctx.strokeStyle="#ff0000";
    ctx.beginPath();
    ctx.moveTo(0,yoff);
    ctx.lineTo(1000, yoff);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth= 3;
    ctx.strokeStyle="#ffd111";
    ctx.moveTo(945,yoff);
    ctx.lineTo(945, yoff-60);
    ctx.stroke();
}

function drawExplosion(xpos, ypos) {
    var angle=0,range=0;
    var el = document.getElementById("gamecanvas");
    var ctx = el.getContext("2d");
    var x, y, x0, y0;

    ctx.strokeStyle="#ffff00";
    ctx.beginPath();

    for(let l1=0; l1<12; l1++) {
        angle=30*l1-15+Math.floor(Math.random() * 30);
        range=15+Math.floor(Math.random() * 30);

        x=Math.round(Math.cos(angle * Math.PI / 180) * range + xpos);
        y=Math.round(Math.sin(angle * Math.PI / 180) * range + ypos);

        if(l1==0) {
            ctx.moveTo(x,y);
            x0=x; y0=y;
        } else if(l1==11) {
            ctx.lineTo(x0,y0);
        } else {
            ctx.lineTo(x,y);
        }
    }

    ctx.stroke();
}

function drawLander({xpos = 50 , ypos = 133}) {
    var el = document.getElementById("gamecanvas");
    var ctx = el.getContext("2d");

    let currX = xpos;
    let currY = ypos

    ctx.strokeStyle="#00ff00";
    ctx.lineWidth= 1;
    ctx.beginPath();
    ctx.arc(xpos, ypos, 15, 0, 2*Math.PI)
    // ctx.ellipse(xpos,ypos,15,20, 0, 0 ,2*Math.PI);

    // Box below circle
    currX += 13, currY += 10
    ctx.moveTo(currX,currY);

    currX += 60
    ctx.lineTo(currX, currY)

    currX += 7, currY -= 4
    ctx.moveTo(currX, currY);
    ctx.arc(currX, currY, 10, 0, 2*Math.PI)

    currX -= 7, currY -= 7
    ctx.moveTo(currX, currY);

    currX -= 60, currY -= 10
    ctx.lineTo(currX, currY)

    currX -= 14, currY -= 30
    ctx.lineTo(currX, currY)

    currX -= 0, currY += 25
    ctx.lineTo(currX, currY)
    currX -= 0, currY -= 25
    ctx.moveTo(currX, currY);

    currX -= 10, currY += 0
    ctx.lineTo(currX, currY)

    ctx.stroke();
}

export default {
    drawGameArea: drawGameArea,
    drawLander: drawLander,
    drawExplosion: drawExplosion
};
