let canvas, context
let scores = 0;

window.onload = () => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    document.addEventListener('keydown', keyDownEvent);


    //render speed times pre sec
    let speed = 8;
    setInterval(draw, 1000 / speed);
}

    let gridSize = tileSize = 20;
    let nextX = nextY = 0;

    let defTailSize = 1;
    let tailSize = 1;
    let snakeTail = [];
    let positionX = positionY = 10;
    let appleOnSnake = false;

    let appleX = appleY = 15;

    function draw() {
        positionX += nextX;
        positionY += nextY;

        //Snake over game world
        if (positionX < 0){
            positionX = gridSize - 1;
        }
        if (positionX > gridSize - 1){
            positionX = 0;
        }
        if (positionY > gridSize - 1){
            positionY = 0;
        }
        if (positionY < 0){
            positionY = gridSize - 1;
        }

        //After eat score += 10
        if (positionX == appleX && positionY == appleY) {
            tailSize++;
            scores += 10;
            document.getElementById('score').innerHTML = scores;

            //Random  position apple
            /*appleX = Math.floor(Math.random() * gridSize);
            appleY = Math.floor(Math.random() * gridSize);*/

            //Check position apple if onSnake
            //But it seems it won't work.
            for (let i = 0 ; i < snakeTail.length; i++){
                if (appleX == snakeTail[i].x && snakeTail[i].y == appleY){
                    appleStack = true;
                    break;
                }
                if (appleOnSnake) {
                    do {
                      appleX = Math.floor(Math.random() * gridSize);
                      appleY = Math.floor(Math.random() * gridSize);
                      appleOnSnake = false;
                      for (let i = 0; i < snakeTail.length; i++) {
                        if (snakeTail[i].x === appleX && snakeTail[i].y === appleY) {
                          appleOnSnake = true;
                          break;
                        }
                      }
                    } while (appleOnSnake);
                  }         
                else {
                    appleX = Math.floor(Math.random() * gridSize);
                    appleY = Math.floor(Math.random() * gridSize);
                }
            }
            
        }

        context.fillStyle = "gray";
        context.fillRect(0, 0, canvas.width, canvas.height);

            //Paint snake
        context.fillStyle = "green";
        for (let i = 0 ; i < snakeTail.length; i++){
            context.fillRect(
                snakeTail[i].x * tileSize,
                snakeTail[i].y * tileSize,
                tileSize,
                tileSize
            )
            //Snake bite its tail
                if (snakeTail[i].x == positionX && snakeTail[i].y == positionY){
                    tailSize = defTailSize;
                    scores = 0;
                    document.getElementById('score').innerHTML = scores;
                }
        }

        //Apple
        context.fillStyle = 'red';
        context.fillRect(appleX * tileSize, appleY * tileSize , tileSize , tileSize)


        //Set snake tail
        snakeTail.push({ x: positionX, y: positionY});
        while (snakeTail.length > tailSize){
            snakeTail.shift();
        }
    }

    function keyDownEvent(e) {
        switch (e.keyCode) {
            case 65: 
                nextX = -1;
                nextY = 0;
                break;
            case 87: 
                nextX = 0;
                nextY = -1;
                break;
            case 68: 
                nextX = 1;
                nextY = 0;
                break;
            case 83: 
                nextX = 0;
                nextY = 1;
                break;
        }
    }