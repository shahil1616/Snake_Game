const canvas= document.getElementById('canvas');
const pen= canvas.getContext('2d');
pen.fillStyle="yellow";
const cs=67;
const W=1000;
const H=700;
let food=null;
let gameOver=false;
let score=0;
const snake={
    init_len:5,
    direction: 'right',
    cells:[],
    createSnake: function(){
        for(let i=0;i<this.init_len;i++)
            {
                this.cells.push({
                    x:i,
                    y:0
                })

            }
    },
    drawSnake:function()
    {
        for(let cell of this.cells)
            {
                pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1);

            }
    },
    updateSnake: function(){
//   getting the head of the sanke
        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;

      

        if(headX===food.x && headY===food.y )
            {
                food=getRandomFood();
                score++;
            }
            else{
               
        // removing the first cell
        this.cells.shift();
            }
    //    next head
        let nextX;
        let nextY;

        if(this.direction==='down')
            {
                nextX=headX;
                nextY=headY+1;
                if(nextY*cs>=H)
                    {
                            pen.fillStyle='blue'
                            pen.fillText('Game Over',W/2,H/2);
                        clearInterval(id);
                    }

            }
            else if(this.direction==='up')
                {
                    nextX=headX;
                    nextY=headY-1;

                    if(nextY*cs<0)
                        {
                                pen.fillStyle='blue'
                                pen.fillText('Game Over',W/2,H/2);
                            clearInterval(id);
                        }

                }
                else if(this.direction==='left')
                    {
                        nextX=headX-1;
                        nextY=headY;

                        if(nextX*cs<0)
                            {
                                    pen.fillStyle='blue'
                                pen.fillText('Game Over',W/2,H/2);
                                clearInterval(id);
                            }
    
                    }

                 else
                    {

                    nextX=headX+1;
                    nextY=headY;
                    if(nextX*cs>=W)
                        {
                                pen.fillStyle='blue'
                                pen.fillText('Game Over',W/2,H/2);
                            clearInterval(id);
                        }
                    }   
                    


        // pushing next head to the cells
        this.cells.push({
            x:nextX,
            y:nextY
        });


    }



}




// This is initial Function to initialise the game
function init()
{
   snake.createSnake();
   food=getRandomFood();
   function keypressed(e)
   {
     if(e.key==='ArrowDown')
        {
            snake.direction='down';
        }
        else if(e.key==='ArrowUp')
        {
            snake.direction='up';
        }
        else if(e.key==='ArrowLeft')
            {
                snake.direction='left';
            }
            else
            {
                
                    snake.direction='right';
                
            }
   }

   document.addEventListener('keydown',keypressed);
}
// This function  update the properties of the game
function update(){

    // if(gameOver===true)
    //     {
    //         clearInterval(id);
    //     }
   snake.updateSnake();

}

// This function  draw something on the canvas
function draw()
{

    pen.clearRect(0,0,W,H);


    pen.font="40px sans-serif"
    pen.fillText(`Score ${score}`,100,100); 
    pen.fillStyle='red';
    
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle='yellow';
    snake.drawSnake();
}

function gameLoop(){
   
    draw();
    update();
   

}

function getRandomFood()
{
    const foodX=Math.round(Math.random()*(W-cs)/cs);
    const foodY=Math.round(Math.random()*(H-cs)/cs);

    food={
        x:foodX,
        y:foodY
    }
    return food;

}

init();
const id= setInterval(gameLoop,100);