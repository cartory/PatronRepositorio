
const matrix9 = [
  [[7], [2], [], [9], [4], [5], [], [3], []],
  [[], [3], [9], [2], [], [6], [], [], [4]],
  [[1], [5], [], [7], [3], [8], [6], [9], [2]],

  [[6], [4], [7], [1], [], [3], [], [2], []],
  [[9], [8], [2], [6], [5], [7], [4], [1], [3]],
  [[3], [], [5], [4], [9], [2], [7], [], [6]],

  [[4], [9], [3], [], [6], [1], [], [5], [7]],
  [[5], [7], [], [3], [2], [], [8], [6], [9]],
  [[], [], [8], [5], [7], [9], [3], [4], []],
];

const Sudoku = {
  start: function () {
    for (var i = 0; i < 9; i++) {
      var row = $("<tr></tr>");
      for (var j = 0; j < 9; j++) {
        var sBlock = $('<td class="sBox edit"></td>');
        sBlock.attr("id", `Block_${i}_${j}`).text(Sudoku.matrix[i][j]);
        row.append(sBlock);
        if (Sudoku.matrix[i][j] != "") {
          sBlock.removeClass("edit");
        }
        var groups = Math.floor(Math.sqrt(9));
        var gA = Math.floor(i / groups);
        var gB = Math.floor(j / groups);
        if (gA % 2 == gB % 2) {
          sBlock.addClass("sGroup");
        } else {
          sBlock.addClass("sGroup2");
        }
        $("#sTable").append(row);
      }
    }
  },

  play: function () {
    $(".sBox").click(function (event) {
      event.stopPropagation();
      if ($(this).hasClass("edit") == true) {
        $(".selectActive").removeClass("selectActive");
        $(this).addClass("selectActive");
        if (!navigator.userAgent.match(/mobile/i)) {
          $(".select")
            .css("top", event.pageY)
            .css("left", event.pageX)
            .addClass("active");
        } else {
          $(".select").css("top", "40%").css("left", "50%").addClass("active");
        }
      }
    });

    $(".select div").click(function () {
      var thisInput = $(this).text();
      var location = $(".selectActive").attr("id").split("_"); 
      var thisRow = parseInt(location[1]); 
      var thisCol = parseInt(location[2]); 
      Sudoku.matrix[thisRow][thisCol] = parseInt(thisInput); 

      $(".sWrong").removeClass("sWrong");
      Sudoku.compare(); 
      $(".selectActive").text(parseInt(thisInput));
      $(".selectActive").removeClass("selectActive");
      $(".select").removeClass("active");
    });

    $("html").click(function () {
      $(".selectActive").removeClass("selectActive");
      $(".select").removeClass("active");
    });
  },

  validAxis: function (matrix, i, j, h) {
    return (
      (matrix[i][j] == matrix[i][h] && j != h) || //valid rows in Sudoku rules
      (matrix[i][j] == matrix[h][j] && i != h) //valid cols in Sudoku rules
    );
  },

  validZone: function (matrix, i, j, k, l) {
    return (
      matrix[i][j] ==
        matrix[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l] &&
      !(i == parseInt(i / 3) * 3 + k && j == parseInt(j / 3) * 3 + l)
    );
  },

  compare: function () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        for (var h = 0; h < 9; h++) {
          if (this.validAxis(Sudoku.matrix, i, j, h)) {
            $(`#Block_${i}_${j}`).addClass("sWrong");
          }
          for (var k = 0; k < 3; k++) {
            for (var l = 0; l < 3; l++) {
              if (this.validZone(Sudoku.matrix, i, j, k, l)) {
                $(`#Block_${i}_${j}`).addClass("sWrong");
              }
            }
          }
        }
      }
    }
  },
};

$(document).ready(function () {
  Sudoku.matrix = matrix9;
  Sudoku.start();
  Sudoku.play();
});
