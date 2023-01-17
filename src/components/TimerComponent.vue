<template>
    <div class="clock">
        {{minutes}}:{{seconds}}
    </div>
</template>

<script>
export default {
    name: "TimerComponent",
    props: [ 'minutes', 'seconds' ],

}
</script>

<style scoped>
.clock {
    font-family: 'silkscreennormal';
    font-size: 36pt;
    line-height: 48px;
    display: inline-block;
    min-width: 150px; text-align: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
}

@font-face {
    font-family: 'silkscreennormal';
    src: url('../assets/fonts/slkscr-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>
