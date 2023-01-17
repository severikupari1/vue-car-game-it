<template>
    <div class="meter meter--speed">
        <div class="label label-unit"><span>Speed</span><div>Km/h</div></div>
        <div v-for="step in steps" class="ticks" v-bind:key="step">
            <div v-bind:class="`grad grad--${step} ${redzone(step)}`" v-bind:style="style(step)">{{step}}</div>
            <div v-bind:class="`grad-tick grad-tick--${step} ${redzone(step)}`" v-bind:style="style_tick(step)"></div>
            <div v-if="step < maxSpeed" v-bind:class="`grad-tick grad-tick--half grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_half(step)"></div>
            <div v-if="step < maxSpeed" v-bind:class="`grad-tick grad-tick--quarter grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_q1(step)"></div>
            <div v-if="step < maxSpeed" v-bind:class="`grad-tick grad-tick--quarter grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_q2(step)"></div>
        </div>
        <div class="needle" v-bind:style="style_needle(speed)"></div>
        <div class="needle-axle"></div>
    </div>
</template>
<script>


  const margin = 10;
  const angleMin = 30;
  const angleMax = 330;
  const steps = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220];
  const maxSpeed = steps[steps.length - 1]
  const angleStep = (angleMax - angleMin) / 220;

  const redzone = () => ""

  const angle = speed => angleMin + speed  * angleStep;

  const styleForTick = tick => ({
    left: `${(50 - (50 - margin) * Math.sin(angle(tick) * (Math.PI / 180)))}%`,
    top: `${(50 + (50 - margin) * Math.cos(angle(tick) * (Math.PI / 180)))}%`
  })
  const styleForQ = angleFun => tick => ({
    left: `${(50 - 50 * Math.sin(angleFun(tick) * (Math.PI / 180)))}%`,
    top: `${(50 + 50 * Math.cos(angleFun(tick) * (Math.PI / 180)))}%`,
    transform: "translate3d(-50%, 0, 0) rotate(" + (angleFun(tick) + 180) + "deg)"
  })
  const value2angle = (value) => {
    return ((value / (maxSpeed - 0)) * (angleMax - angleMin) + angleMin);
  };

  const styleForNeedle = speed => ({
    transform: `translate3d(-50%, 0, 0) rotate(${value2angle(speed)}deg)`
  })

  export default {
    name: 'speedometer',
    props: ['speed'],
    data: function () {
      return {
        // meter: addMeter(),
        maxSpeed,
        steps ,
        style: styleForTick,
        style_tick: styleForQ(angle),
        style_tick_half: styleForQ((speed) => angle(speed) + angleStep * 20 / 2),
        style_tick_q1: styleForQ((speed) => angle(speed) + angleStep * 20 / 4),
        style_tick_q2: styleForQ(speed => angle(speed) + ( angleStep * 20 * 3 / 4)),
        style_needle: styleForNeedle,
        redzone,
      }
    },
    mounted: function () {
      // this.meter.setValue(1000)
    }

  }
</script>

