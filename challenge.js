/*
Exercise Goal:
    - The goal of this exercise is to show us how you apply software engineering
    principles to create a maintainable software solution.

    How to approach this:

            - Don't worry about persistence. It would make sense here, but for this
            exercise only use in-memory data structures.
            - Don't worry about tricks or "gotchyas", as there aren't any.
            - Just focus on writing clean maintainable code.



Specification:

    Create a class LeaderBoard which includes the following methods:

    Method Name: add_score

        - Add a new score to the player's average. If a player doesn't exist in the
        LeaderBoard, they will be automatically added.

        Args:

                playerId (Integer): The player's ID.
                score (Integer): The score to record for the player

        Returns:

                Int: The new average score for the given player

    Method Name: top

        - Get the top player_ids on the leaderboard ordered by their average scores
        from highest to lowest

        Args:

                numPlayers (Integer): The maximum number of player_ids to return

        Returns:

                List<Integer>: a list of player_ids

    Method Name: reset

        - Removes any scoring information for a player

        Args:
            player_id (Integer): The player's ID.
*/
// class Players {
//   constructor(playerId, scores, averageScore) {
//     this.playerId = playerId
//     this.scores = scores
//     this.averageScore = averageScore
//   }

// add_score(playerId, score) {
//   for (let i = 0; i < players.length; i++) {
//     if (players[i].playerId === playerId) {
//
//       players[i].scores.push(score)
//       let sum = 0
//       sum = players[i].scores.reduce(function(acc, cur) {
//         return acc + cur
//       })
//       let average = sum / players[i].scores.length
//       players[i].averageScore = average
//       if (playerId === 3) {
//         console.log(players[i].averageScore)
//         console.log(players[i].scores)
//       }
//       return players[i].averageScore
//     } else {
      // players.push({
      //   playerId: playerId,
      //   scores: [],
      //   averageScore: 0
      // })
//     }
//   }
// }

let players = []

class Leaderboard {
  add_score(playerId, score) {
    let index = players.findIndex((player) => player.playerId === playerId)

    if (index === -1) {
      players.push({
        playerId: playerId,
        scores: [score],
        averageScore: score
      })
    } else {
      players[index].scores.push(score)
        let sum = 0
        sum = players[index].scores.reduce(function(acc, cur) {
          return acc + cur
        })
        let average = sum / players[index].scores.length
        players[index].averageScore = average
        return players[index].averageScore
    }
    console.log(players)
  }
  top(numPlayers) {
    players.sort(function(a, b){
      return b.averageScore - a.averageScore
    })
      return players.slice(numPlayers - 1)
  }
  reset(playerId) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerId === playerId) {
        players[i].scores = []
        players[i].averageScore = 0
        }
        return players[i]
      }
    }
}


  // Test code here

  function array_equals(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const leaderboard = new Leaderboard()

  leaderboard.add_score(1, 50)
  console.log(leaderboard.add_score(2, 80) == 80)
  console.log(leaderboard.add_score(2, 70) == 75)
  console.log(leaderboard.add_score(2, 60) == 70)
  console.log('Add score should return the average. test with 1 score')
  console.log(leaderboard.add_score(3, 90) == 90)
  console.log('Add score should return the average. test with 2 scores')
  console.log(leaderboard.add_score(3, 85) == 87.5)
  console.log('Top 3 [' + leaderboard.top(3) + '] should equal [3, 2, 1]:')
  console.log(array_equals(leaderboard.top(3), [3, 2, 1]))
  console.log('Top 2 [' + leaderboard.top(2) + '] should equal [3, 2]:')
  console.log(array_equals(leaderboard.top(2), [3, 2]))
  leaderboard.reset(3)
  console.log('After reset top 3 [' + leaderboard.top(3) + '] should equal [2, 1, 3]')
  console.log(array_equals(leaderboard.top(3), [2, 1, 3]))
