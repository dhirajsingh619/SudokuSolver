var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudokusolver(board, 0, 0, 9);
}
/*
function SudokuSolver(board, i, j, n) {
	// Write your Code here
}
*/
function isValid(board,row,col, n, num){
    //check in row:
    for(let i=0;i<n;i++){
        if(board[row][i]==num) return false;
    }
    //check in col:
    for(let i=0;i<n;i++){
        if(board[i][col]==num) return false;
    }
    //check in sub grid:
    let temp=Math.sqrt(n);
    let r=row-(row%temp);
    //r*=temp;
    let c=col-(col%temp);
    //c*=temp;

    for(let i=0;i<temp;i++){
        for(let j=0;j<temp;j++){
            if(board[i+r][j+c]==num) return false;
        }
    }
    return true;

}
function sudokusolver(board, row, col, n){
    if(row==n){
        
		FillBoard(board);
        return true;
    }
    
    if(col>=n){
        return sudokusolver(board,row+1,0,n);
    }
    if(board[row][col]!=0) {
        return sudokusolver(board,row,col+1,n);
    }
    for(let i=1;i<=n;i++){
        
        if(isValid(board,row,col,n,i)){
            board[row][col]=i;
            let tempans=sudokusolver(board,row,col+1,n);
            if(tempans) return tempans;
            //backtracking (undo the changes)
            board[row][col]=0;
        }

    }return false;

}