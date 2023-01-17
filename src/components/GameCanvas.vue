<template>
    <div>

        <p>Speed to beat: {{ fastest }} km/h!</p>
        <div class="gamecontainer">
            <div class="dashboard">
                <rpmtachometer :rpm="rpm"/>

                <div class="meter meter--gear">
                    <div v-bind:class="`${isChanging? 'ischanging': ''}`">{{ gear }}</div>
                </div>
                <speedometer :speed="speed"/>
            </div>

            <canvas class="gamecanvas" id="gamecanvas" width="1000" height="200"/>

            <div class="grid-container">
                <div class="column">
                    <button @click="startSimulation" class="runbutton">
                        <i class="fas fa-play"/>
                    </button>
                </div>
                <div class="column">
                    <button @click="stop" class="runbutton">
                        <i class="fas fa-stop"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import timerComponent from "./TimerComponent.vue";
  import rpmtachometer from "./RpmMeter.vue";
  import speedometer from "./SpeedoMeter.vue";

  import canvasTools from "../game-engine/canvas.js";
  import gameEngine from "../game-engine/game.js";

  import {drawCanvas, drawCar, drawExplosion} from "../game-engine/draw";
  import {getLatest, updateLatest} from "../game-engine/base"

  var gameInterval;
  var startingTime;
  var latestCode;

  export default {
    name: 'GameCanvas',

    components: {
      timerComponent,
      rpmtachometer,
      speedometer,
    },

    props: ['bus', 'fastest'],


    data: function () {
      return {
        minutes: 15,
        seconds: "00",
        rpm: 0,
        gear: 0,
        speed: 0,
        isChanging: false,
        location: 0,
      };
    },

    methods: {

      startSimulation: function () {
        // Remove any pending intervals
        if (gameInterval) {
          clearInterval(gameInterval);
          gameInterval = null;
        }

        // Remove syntax error line (if any)
        this.$emit('syntaxerror', false);
        this.$emit('wrongargument', false);

        // Reset game engine values & initialize game area
        gameEngine.reset();
        drawCanvas(canvasTools)
        drawCar(canvasTools, gameEngine)

        // This will request the coder from CodeEditor & start the engine
        this.bus.$emit('requestcode');
      },
      stop: function () {
        this.$emit('syntaxerror', false);
        this.$emit('wrongargument', false);
        stopLoop(canvasTools, gameEngine)
      }

    },

    mounted: function () {
      var that = this;

      // Set starting time
      startingTime = new Date();
      latestCode = "-not changed-";

      // Reset game-engine
      gameEngine.reset();
      drawCanvas(canvasTools)
      drawCar(canvasTools, gameEngine)

      // Bind event
      this.bus.$on('transmitcode', (code) => {
        var that = this;

        latestCode = code;
        this.$emit('oncrash', false);

        const game = gameEngine.initialize(code)
        gameInterval = setInterval(function () {
          runloop(that, game, code);
        }, 100);

      });

      // Return latest code & time spent
      this.bus.$on('datareq', () => {
        this.bus.$emit('dataresp', {
          code: latestCode,
          time: Math.floor((new Date() - startingTime) / 1000)
        })
      });
    },

    beforeDestroy: function () {
      if (gameInterval) {
        clearInterval(gameInterval);
      }
      this.bus.$off('transmitcode');
      this.bus.$off('datareq');
    }
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  function runClockLoop(that) {
    var timeSpent = Math.floor((new Date() - startingTime) / 1000);

    // 15 x 60s => 900s
    var timeLeft = 900 - timeSpent;

    if (timeLeft < 0) {
      timeLeft = 0;
      clearInterval(gameInterval);
      that.bus.$emit('gameover', 'timeout');
    }

    that.minutes = Math.floor(timeLeft / 60);
    that.seconds = (timeLeft % 60) < 10 ? "0" + (timeLeft % 60) : (timeLeft % 60);
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const stopLoop = (canvasTools, gameEngine) => {
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
    // Remove syntax error line (if any)
    gameEngine.reset()
    drawCanvas(canvasTools)
    drawCar(canvasTools, gameEngine)
  }

  const runloop = (that, game, code) => {
    var endState = null;

    // Run simulation loop
    if (game.isFinished()) {
      clearInterval(gameInterval);
      endState = game.getSpeed() > 140 ? 1 : 0;
    } else {
      endState = game.run(code)
    }


    // Draw game area & lander
    drawCanvas(canvasTools)
    drawCar(canvasTools, game)
    drawExplosion(canvasTools, game)

    that.rpm = game.getRpm();
    that.gear = game.getGear();
    that.speed = game.getSpeed();
    that.isChanging = game.isChangingGears();
    that.location = game.getLocation();

    if (endState === null && game.isFinished()) {
      return;
    }

    let isFastest = false
    if (endState === 1 && game.getSpeed() > that.fastest) {
      isFastest = true;
      updateLatest(game.getSpeed())
    }

    // Has the simulation ran it's course, if yes.. check the end result
    if (endState === -1) {
      // Lander crashed
      that.$emit('oncrash', true);
    } else if (endState === 1) {
      // Lander safe
      console.log("FINISHED!!!", game.getSpeed())
      that.bus.$emit('gameover', { speed: that.speed, isFastest });
    } else if (endState === -2) {
      // Syntax error in code
      clearInterval(gameInterval);
      that.$emit('syntaxerror', true);
    } else if (endState < 0) {
      clearInterval(gameInterval);
      that.$emit('wrongarguments', true);
    }
  }
</script>

<style scoped>
    .gamecanvas {
        background-color: #000;
        border: 1px solid #bdbdbd;
        position: relative;
        height: 200px;
        width: 1000px;
        margin: 0px 15px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
    }

    .runbutton {
        font-size: 2em;
        border: 1px solid black;
        border-radius: 5px;
    }

    .quitbutton {
        font-size: 2em;
        border: 1px solid black;
        border-radius: 5px;
        margin-left: 20px;
        vertical-align: top;
    }

    button i {
        margin: 5px;
    }
</style>
