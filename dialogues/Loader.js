const partA = require('./partA');
const partB = require('./partB');
const partC = require('./partC');

module.exports = {
    // Partie loader using [user_progress]
    partie: {
        // Starter
        1: partA.part1,
        2: partA.part2,
        3: partA.part3,
        4: partA.part4,
        // Discord js 1
        5: partB.part1,
        6: partB.part2,
        7: partB.part3,
    },

    // Just Part File
    partA,
    partB,
    partC,

}