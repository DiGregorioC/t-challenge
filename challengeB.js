class Leaderboard {
  constructor(){
    this.players = {}
  }
  add_score(playerId, score) {
    if (this.players[playerId]) {
      this.players[playerId].scores.push(score)
      return this.calculateAverage(playerId)
    } else {
      this.players[playerId] = {
        scores: [score],
        averageScore: score
      }
      return score
    }
  }
  top(numPlayers) {
    return Object.keys(this.players).sort((a,b) =>
      this.players[b].averageScore - this.players[a].averageScore
    ).slice(0,numPlayers).map(x => parseInt(x))
  }
  reset(playerId) {
    this.players[playerId] = {
      scores: [],
      averageScore: null
    }
  }

  calculateAverage(playerId) {
    const average = this.players[playerId].scores.reduce((acc,cur) => acc+cur) / this.players[playerId].scores.length
    this.players[playerId].averageScore = average
    return average
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
