<template>
    <modal name="endmodal" v-bind:clickToClose="false" v-bind:scrollable="true" height="auto" width="800">
        <div class="modal-content">
            <h1>Wow! You made it</h1>

            <div v-if="speed.isFastest">
                <p>You made record of the day {{   Math.floor( speed.speed * 10) / 10 }} km/h!</p>
                <p>Congrats!</p>
            </div>
            <div v-else>
                <p>Your speed was {{ speed.speed }} km/h. Record of the day is {{ fastest }} km/h</p>
            </div>

            <p>There is a lottery for all people taking part in this game. If you want to take part, </p>
            <button class="sendbtn" @click.prevent="sendAnswers">I will take part in lottery!</button>
            <button class="dismissbtn" @click.prevent="backToStart">Not this time</button>

        </div>
    </modal>
</template>
<script>
  export default {
    name: 'EndModal',

    props: ['speed', 'fastest'],

    computed: {
      titleText: function () {
        if (this.endreason == "timeout") {
          return "Time ran out";
        } else if (this.endreason == "giveup") {
          return "Mission aborted";
        } else if (this.endreason == "winner") {
          return "Safe landing!";
        }
      },

      sendDisabled: function () {
        return !this.permission;
      }


    },

    methods: {
      sendAnswers: function () {
        this.$emit('sendanswers');
      },

      backToStart: function () {
        this.$emit('skipsending');
      }
    }

  }
</script>

<style scoped>
    .intrest-span {
        display: inline-block;
        text-align: left;
    }

    button {
        margin-top: 50px;
        font-size: 14pt;
        border-radius: 5px;
        padding: 5px 10px;
    }

    .btn {

        margin-top: 50px;
        font-size: 14pt;
        border-radius: 5px;
        padding: 5px 10px;

    }

    .sendbtn {
        margin-right: 20px;
        background-color: #4CAF50;
    }

    .dismissbtn {
        background-color: #FF2250;
    }
</style>
