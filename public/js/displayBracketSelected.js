$(document).ready(function () {

    
});

var displaySingleElimination = function () {

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

    var singleEliminationData = {
        teamWidth: 100,
        scoreWidth: 20,
        matchMargin: 30,
        roundMargin: 50,
        init: data
    };

    $(function () {
        var container = $('#display-bracket-type')

        container.bracket(singleEliminationData);
    });

}

var displayDoubleElimination = function () {

    var data = {
        teams: [
            [null, null],
            [null, null],
            [null, null],
            [null, null]
        ],
        results: [[
            // WINNER BRACKET
            [
                [null, null],
                [null, null],
                [null, null],
                [null, null]
            ],
            // first and second matches of the first round
            [
                [null, null],
                [null, null]
            ],
            // second round
            [
                [null, null]
            ]
        ],
        [
            // LOSER BRACKET
            [
                [null, null],
                [null, null],
                [null, null],
                [null, null]
            ],
            // first round
            [
                [null, null],
                [null, null]
            ],
            // second round
            [
                [null, null]
            ]
        ]]
    };

    var doubleEliminationData = {
        teamWidth: 100,
        scoreWidth: 20,
        matchMargin: 30,
        roundMargin: 50,
        skipGrandFinalComeback: true,
        init: data
    };

    $(function () {

        var container = $('#display-bracket-type');

        $(container).bracket(doubleEliminationData);

    })
};