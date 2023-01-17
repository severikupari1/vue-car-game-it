<template>
    <div :id="editorId" class="content-box flask-editor">function calcIteration(gear, rpm) {
  // This loop is executed every tenth of a second.
  // The variables you'll get are gear (0-6) and rpm.

  // There are couple of things to know
  // Car will crash on too high RPM
  // in some situations, changing gears take more time,
  // and slows you down!

  // ::::::::::::::::::
  // Start your engines!
  // ::::::::::::::::::

  if(gear === 0){
      return 1;
  }

  // ::::::::::::::::::
  // Add your code here - return gear (1...6)
  //  (please, no xss attacks, etc - this is not production code)
  // ::::::::::::::::::

  return gear;
<!--  return gear;-->
}</div>
</template>

<script>
import CodeFlask from 'codeflask';
var editorObj;

export default {
    name: 'CodeEditor',
    props: [ 'name', 'bus' ],

    data: function() {
        return {
            editorId: this.name + "-flask"
        };
    },

    methods: {
      fetchCode: function() {
        this.bus.$emit('transmitcode', editorObj.getCode());
      }
    },

    mounted: function() {
        editorObj = new CodeFlask(
            document.getElementById(this.editorId), { language: 'js' }
        );

        this.bus.$on('requestcode', this.fetchCode);
    },

    beforeDestroy: function() {
        this.bus.$off('requestcode');
    }
}
</script>

<style scoped>
    .flask-editor {
        min-height: 600px;
        min-width: 600px;
    }
</style>
