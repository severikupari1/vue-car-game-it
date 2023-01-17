<template>
    <!--    <modal name="speedometermodal">-->
    <div class="meter meter--rpm meter--big-label">
        <div v-for="step in steps" class="ticks" v-bind:key="step">
            <div v-bind:class="`grad grad--${step} ${redzone(step)}`" v-bind:style="style(step)">{{step}}</div>
            <div v-bind:class="`grad-tick grad-tick--${step} ${redzone(step)}`" v-bind:style="style_tick(step)"></div>
            <div v-if="step <= 7" v-bind:class="`grad-tick grad-tick--half grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_half(step)"></div>
            <div v-if="step <= 7" v-bind:class="`grad-tick grad-tick--quarter grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_q1(step)"></div>
            <div v-if="step <= 7" v-bind:class="`grad-tick grad-tick--quarter grad-tick--${step} ${redzone(step)}`"
                 v-bind:style="style_tick_q2(step)"></div>
        </div>
        <div class="needle" v-bind:style="style_needle(rpm)"></div>
        <div class="needle-axle"></div>
        <div class="label label-value"><div>{{rpm}}</div><span>RPM</span></div>
    </div>
    <!--    </modal>-->
</template>
<script>


  const margin = 10;
  const angleMin = 30;
  const angleMax = 330;
  const angleStep = (angleMax - angleMin) / 8;

  const redzone = (tick) => tick >= 7 ? " redzone" : ""

  const angle = tick => angleMin + tick * angleStep;

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
    return ((value / (8000 - 0)) * (angleMax - angleMin) + angleMin);
  };

  const styleForNeedle = rpm => ({
    transform: `translate3d(-50%, 0, 0) rotate(${value2angle(rpm)}deg)`
  })

  export default {
    name: 'rpmtachometer',
    props: ['rpm'],
    data: function () {
      return {
        // meter: addMeter(),
        steps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        style: styleForTick,
        style_tick: styleForQ(angle),
        style_tick_half: styleForQ((tick) => angle(tick) + angleStep / 2),
        style_tick_q1: styleForQ((tick) => angle(tick) + angleStep / 4),
        style_tick_q2: styleForQ(tick => angle(tick) + ( angleStep * 3 / 4)),
        style_needle: styleForNeedle,
        redzone,
      }
    },
    mounted: function () {
    }

  }
</script>

