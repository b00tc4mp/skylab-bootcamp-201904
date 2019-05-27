class Game {
    constructor(gameId, creator, maxPlayer) {
        this.gameId = gameId
        this.started = maxPlayer > 1 ? false : true
        this.players = [creator]
        this.maxPlay = maxPlayer
    }

    addPlayer(newPlayerId) {
        if(this.started) return console.log("Not a valid option")

        if (this.players.length < this.maxPlay) this.players.push(newPlayerId)

        if (this.players.length === this.maxPlay) {

            this.startGame()

            return console.log("Game will start in 5 seconds")
        }

        return console.log("Waiting for more player")
    }

    startGame() {
        this.started = true
    }
}