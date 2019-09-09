
$(document).ready(function () {

  var input = '<input class="form-control" type="text" placeholder="Input Team Name: "></input>';
  $("#teamName").html(input);

  // // Display Single Elimination Bracket
  // $("#SEBtn").on("click", function () {

  //   displaySingleElimination();
  // })

  // // Display Double Elimination Bracket
  // $("#DEBtn").on("click", function () {

  //   displayDoubleElimination();
  // })

  // Submit Form
  $("submitBracket").on("click", function () {


    
  })
})

var populateArr = function() {

  var data = {
    teams: [
      // First Match
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null]
    ],
    results: [
      [
        [
          // Round 1
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null]
        ],
        // Round 2
        [
          [null, null],
          [null, null],
          [null, null],
          [null, null]
        ],
        // Round 3
        [
          [null, null],
          [null, null]
        ],
        // Round 4
        [
          [null, null]
        ]
      ]
    ]
  };

  var team = data.teams;

  for (var i = 0; i < team.length; i++) {
    for (var j = 0; j < team[i].length; j++){

      team[i] = "Team " + (i + 1);

    }
  }

  

}