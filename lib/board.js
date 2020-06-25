'use strict'

class Board {

	constructor(){
		// we know that tic tac toe is 3X3 matrix 
		this.size = 9;
		this.count = 0;
		this.array = null;
		this.init();
	}
	
	checkWinner(){

		// Check horizontal or vertical

		if((this.check(0,1) && this.check(1,2)) || (this.check(0,3) && this.check(3,6))){

			if (this.array[0] != 'E') return this.array[0];
		}

		if((this.check(3,4) && this.check(4,5)) || (this.check(1,4) && this.check(4,7)) ){
			if (this.array[4] != 'E') return this.array[4];
		}

		if((this.check(6,7) && this.check(7,8)) || (this.check(2,5) && this.check(5,8))){
			if (this.array[8] != 'E') return this.array[8];
		}

		// check diagonal

		if((this.check(0,4) && this.check(4,8)) || (this.check(2,4) && this.check(4,6))){
			if (this.array[4] != 'E') return this.array[4];
		}

		if(this.count == 9){
			return 'D';
		}

	}
	move(id, player){
		//validateMove();
		if(this.array[id] != 'E'){
			return 'IM';
		} else{
			this.array[id] = player;
		}
		this.count++;
		return null;
	}
	init(){
		this.array = new Array(9);
		for(var i = 0 ; i < 9; i++){
			this.array[i] = 'E';
		}
	}

	isFilled(){
		return this.count == 9;
	}

	check(x, y){
		return this.array[x] == this.array[y];
	}

	getBoardData(){
		return this.array;
	}


}
module.exports = Board;
