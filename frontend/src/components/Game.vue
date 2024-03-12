<template>
    <div>
      <canvas ref="game" width="640" height="480" style="border: 1px solid black"></canvas>
      <p>
        <button @click="move('right')">right</button>
        <button @click="move('left')">left</button>
        <button @click="move('up')">up</button>
        <button @click="move('down')">down</button>
      </p>
    </div>
  </template>
  
  <script>
  import io from "socket.io-client";
  
  export default {
    data() {
      return {
        socket: null,
        context: null
      };
    },
    mounted() {
      this.socket = io("localhost:3000");
      this.context = this.$refs.game.getContext("2d");
      this.socket.on("position", position => {
        this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
        this.context.fillRect(position.x, position.y, 20, 20);
      });
    },
    methods: {
      move(direction) {
        this.socket.emit("move", direction);
      }
    }
  };
  </script>