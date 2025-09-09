number_of_row = 4;
number_of_column = 4;

class LOController{
  constructor(n_row, n_col){
    this.n_row = n_row;
    this.n_col = n_col;

    this.fieldDiv = document.getElementById("lo_field");
    
    this.tileDivs = [];
    this.initialize();
  }

  initialize(){
    this.tileDivs = [];
    // this.fieldDiv.innerHTML = "";
    for(let i = 0; i < this.n_row; ++i){
      this.tileDivs.push([]);
      for(let j = 0; j < this.n_col; ++j){
        let tile_div = document.createElement("div");
        tile_div.dataset.row = i;
        tile_div.dataset.col = j;
        tile_div.dataset.color = 1;
        tile_div.addEventListener("click", () => {
          this.flip(i, j);
        });
        this.fieldDiv.appendChild(tile_div);
        this.tileDivs[i].push(tile_div);
      }
    }
    this.reset();

    const res_btn = document.getElementById("reset_btn");
    res_btn.addEventListener("click", () => {
      this.reset();
    });
  }


  reset(){
    for(let i = 0; i < this.n_row; ++i){
      for(let j = 0; j < this.n_col; ++j){
        if(Math.random() < 0.5){
          this.flip(i,j);
        }
      }
    }
  }

  /**
   * 
   * @param {number} row 
   * @param {number} col 
   */
  flip(row, col){
    this.tileDivs[row][col].dataset.color *= -1;
    if(row > 0){
      // 一番上の行以外
      this.tileDivs[row-1][col].dataset.color *= -1;
    }
    if(row < this.n_row-1){
      // 一番下の行以外
      this.tileDivs[row+1][col].dataset.color *= -1;
    }
    if(col > 0){
      // 一番左の列以外
      this.tileDivs[row][col-1].dataset.color *= -1;
    }
    if(col < this.n_col-1){
      // 一番右の列以外
      this.tileDivs[row][col+1].dataset.color *= -1;
    }
    for(let i = 0; i < this.n_row; ++i){
      for(let j = 0; j < this.n_col; ++j){
        let tile = this.tileDivs[i][j];
        if(tile.dataset.color == 1){
          tile.style.backgroundColor = "black";
        }else{
          tile.style.backgroundColor = "white";
        }
      }
    }
  }

}

loc = new LOController(number_of_row, number_of_column);
