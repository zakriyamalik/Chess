const gameBoard=document.querySelector("#gameboard");
const playerDisplay=document.querySelector("#player");
const infoDisplay=document.querySelector("info-display");
const width=8;
let playerGo='blue';
playerDisplay.textContent='Blue';
const startPieces=[
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook,
   
]


function createBoard()
{
    startPieces.forEach((startPiece,i)=>
    {
        const square=document.createElement('div');
        square.classList.add('square');
        square.innerHTML=startPiece
        square.firstChild?.setAttribute('draggable',true);
        square.setAttribute('square-id',i)
      //  square.classList.add('beige');
        const row= Math.floor((63-i)/8)+1
        if(row%2===0)
        {
            square.classList.add(i%2===0? "beige":"brown");
        }
        else
        {
            square.classList.add(i%2===0? "brown":"beige");
     
        }
        gameBoard.append(square);
        if(i<=15)
        {
            square.firstChild.firstChild.classList.add('blue');
        }

        if(i>=48)
        {
            square.firstChild.firstChild.classList.add('red');
     
        }
    })
}


createBoard();


const allSquares=document.querySelectorAll("#gameboard .square");

allSquares.forEach(square=>{
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
    
    
})
let startPositionId 
let draggedElement
function dragStart(e)
{
    startPositionId =e.target.parentNode.getAttribute('square-id');
    draggedElement =e.target

}

function dragOver(e)
{
    e.preventDefault()

}

function dragDrop(e)
{
    //console.log("dragDrop ")
    e.stopPropagation();
    const taken=e.target.classList.contains('piece')
    //e.target.parentNode.append(draggedElement);
   const valid=checkValid(e.target);
//    console.log("Valid ",valid);
//    console.log("playerGo",playerGo)
//    console.log("draggedElement.firstChild.classList",draggedElement.firstChild.classList)
   
   const correctGo=draggedElement.firstChild.classList.contains(playerGo);
   const opponentGo=playerGo==='red'?'blue':'red'
   const takenByOpponent=e.target.firstChild?.classList.contains(opponentGo);
//    console.log("correctGo ",correctGo);
  
   if(correctGo)
   {
    if(takenByOpponent&& valid)
    {
        // console.log("Valid move 1")
        e.target.parentNode.append(draggedElement);
        e.target.remove();
        checkForWin()
        changePlayer();

        return ;
    }
    if(valid)
    {
        // console.log("Valid move ")
      e.target.append(draggedElement);
      checkForWin()
      changePlayer();
      return ;
    }
   }
    //changePlayer();
}

function changePlayer()
{
    if(playerGo==="blue")
    {
        reverseIds();
       playerGo="red";
        playerDisplay.textContent="red"
    }
    else 
    {
        revertIds()
       playerGo="blue";
         playerDisplay.textContent="blue";
    }
}


function reverseIds()
{
   const allSquares=document.querySelectorAll(".square");
   allSquares.forEach((square,i)=>
    square.setAttribute('square-id', (width * width - 1) - i))
 //  console.log(square)

}

function revertIds()
{
   const allSquares=document.querySelectorAll(".square");
   allSquares.forEach((square,i)=>
    square.setAttribute('square-id',i))
   
}

function checkValid(target)
{
   const targetId=Number(target.getAttribute('square-id'))|| 
    Number(target.parentNode.getAttribute('square-id'))
    const startId=Number(startPositionId)
    const piece=draggedElement.id
    switch(piece)
    {
        case 'pawn':
        const starterRow=[8,9,10,11,12,13,14,15]
       
        if(starterRow.includes(startId) && startId+width*2===targetId
        || startId+width===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
        startId+width-1===targetId&&  document.querySelector(`[square-id="${startId+width-1}"]`).firstChild
       ||  startId+width+1===targetId&&  document.querySelector(`[square-id="${startId+width+1}"]`).firstChild)
       {
       
        return true;
       }
       break;
       case 'knight':
       if(
        startId+width*2+1===targetId||
        startId+width*2-1===targetId||
        startId+width-2===targetId||
        startId+width+2===targetId||
        startId-width*2+1===targetId||
        startId-width*2-1===targetId||
        startId-width-2===targetId||
        startId-width+2===targetId)
        {
            return true;
        }
        break;
        case 'bishop':
            if(
                startId+width+1===targetId||
                startId+width*2+2===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
                startId+width*3+3===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
                startId+width*4+4===targetId &&!document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
                startId+width*5+5===targetId &&!document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                startId+width*6+6===targetId &&!document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild||
                startId+width*7+7===targetId &&!document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild ||
                // --
                startId-width-1===targetId||
                startId-width*2-2===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
                startId-width*3-3===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                startId-width*4-4===targetId &&!document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
                startId-width*5-5===targetId &&!document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                startId-width*6-6===targetId &&!document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild||
                startId-width*7-7===targetId &&!document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild ||
              // --
              startId-width+1===targetId||
              startId-width*2+2===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
              startId-width*3+3===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
              startId-width*4+4===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
              startId-width*5+5===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
              startId-width*6+6===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild||
              startId-width*7+7===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild ||
            //--
            startId+width-1===targetId||
            startId+width*2-2===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
            startId+width*3-3===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
            startId+width*4-4===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
            startId+width*5-5===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
            startId+width*6-6===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild||
            startId+width*7-7===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild       
            )
            {
                return true;
            }
            break;
            case 'rook':
                if(
                    startId+width===targetId||
                    startId+width*2 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild||
                    startId+width*3 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild ||
                    startId+width*4 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild ||
                    startId+width*5 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild ||
                    startId+width*6 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*5}"]`).firstChild ||
                    startId+width*7 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*6}"]`).firstChild ||
                    //--
                    startId-width===targetId||
                    startId-width*2 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild||
                    startId-width*3 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild ||
                    startId-width*4 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild ||
                    startId-width*5 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild ||
                    startId-width*6 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*5}"]`).firstChild ||
                        startId-width*7 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*6}"]`).firstChild ||
                    //--
                    startId-width===targetId||
                    startId-2 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild||
                    startId-3 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild ||
                    startId-4 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild ||
                    startId-5 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild ||
                    startId-6 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-5}"]`).firstChild ||
                    startId-7 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-5}"]`).firstChild && !document.querySelector(`[square-id="${ startId-6}"]`).firstChild ||
                        //--
                    startId+width===targetId||
                    startId+2 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild||
                    startId+3 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild ||
                    startId+4 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild ||
                    startId+5 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild ||
                    startId+6 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+5}"]`).firstChild ||
                    startId+7 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+5}"]`).firstChild && !document.querySelector(`[square-id="${ startId+6}"]`).firstChild 
                
        )
        {
            return true
        }
       case 'queen':
        if(
            startId+width+1===targetId||
            startId+width*2+2===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
            startId+width*3+3===targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
            startId+width*4+4===targetId &&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
            startId+width*5+5===targetId &&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
            startId+width*6+6===targetId &&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild||
            startId+width*7+7===targetId &&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild ||
            // --
            startId-width-1===targetId||
            startId-width*2-2===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
            startId-width*3-3===targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
            startId-width*4-4===targetId &&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
            startId-width*5-5===targetId &&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
            startId-width*6-6===targetId &&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild||
            startId-width*7-7===targetId &&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild ||
            // --
            startId-width+1===targetId||
            startId-width*2+2===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
            startId-width*3+3===targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
            startId-width*4+4===targetId &&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
            startId-width*5+5===targetId &&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
            startId-width*6+6===targetId &&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild||
            startId-width*7+7===targetId &&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild ||
            //--
            startId+width-1===targetId||
            startId+width*2-2===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
            startId+width*3-3===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
            startId+width*4-4===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
            startId+width*5-5===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
            startId+width*6-6===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild||
            startId+width*7-7===targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild&&  !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild  ||     
            //--
            startId+width===targetId||
            startId+width*2 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild||
            startId+width*3 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild ||
            startId+width*4 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild ||
            startId+width*5 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild ||
            startId+width*6 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*5}"]`).firstChild ||
            startId+width*7 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${ startId+width*6}"]`).firstChild ||
            //--
            startId-width===targetId||
            startId-width*2 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild||
            startId-width*3 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild ||
            startId-width*4 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild ||
            startId-width*5 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild ||
            startId-width*6 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*5}"]`).firstChild ||
                startId-width*7 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${ startId-width*6}"]`).firstChild ||
            //--
            startId-width===targetId||
            startId-2 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild||
            startId-3 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild ||
            startId-4 ===targetId && !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild ||
            startId-5 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild ||
            startId-6 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-5}"]`).firstChild ||
            startId-7 ===targetId &&  !document.querySelector(`[square-id="${ startId-width}"]`).firstChild && !document.querySelector(`[square-id="${ startId-2}"]`).firstChild && !document.querySelector(`[square-id="${ startId-3}"]`).firstChild && !document.querySelector(`[square-id="${ startId-4}"]`).firstChild && !document.querySelector(`[square-id="${ startId-5}"]`).firstChild && !document.querySelector(`[square-id="${ startId-6}"]`).firstChild ||
                //--
            startId+width===targetId||
            startId+2 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild||
            startId+3 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild ||
            startId+4 ===targetId && !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild ||
            startId+5 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild ||
            startId+6 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+5}"]`).firstChild ||
            startId+7 ===targetId &&  !document.querySelector(`[square-id="${ startId+width}"]`).firstChild && !document.querySelector(`[square-id="${ startId+2}"]`).firstChild && !document.querySelector(`[square-id="${ startId+3}"]`).firstChild && !document.querySelector(`[square-id="${ startId+4}"]`).firstChild && !document.querySelector(`[square-id="${ startId+5}"]`).firstChild && !document.querySelector(`[square-id="${ startId+6}"]`).firstChild 
        

        )
        {
            return true;
        }
        case 'king':
            if(
                startId+1 === targetId||
                startId-1 === targetId||
                startId+ width === targetId||
                startId- width === targetId||
                startId+ width +1 === targetId||
                startId+ width -1 === targetId||
                startId- width +1 === targetId||
                startId- width -1 === targetId
               )
               {
                return true ;
              }
        

    }
}


function checkForWin()
{
    const Kings=Array.from(document.querySelectorAll('#king'));
    console.log(king);
    if(!Kings.some(king=>king.firstChild.classList.contains('red')))
    {
        console.log("check 1", infoDisplay.innerHTML);
        infoDisplay.innerHTML="blue Player wins!"
        const allSquares=document.querySelectorAll('.square')
         allSquares.forEach(square=>square.firstChild?.setAttribute('draggable',false))
        
    }
    if(!Kings.some(king=>king.firstChild.classList.contains('blue')))
        {
            console.log("check 1", infoDisplay.innerHTML);
            infoDisplay.innerHTML="red Player wins!"
            const allSquares=document.querySelectorAll('.square')
             allSquares.forEach(square=>square.firstChild?.setAttribute('draggable',false))
            
        }
}