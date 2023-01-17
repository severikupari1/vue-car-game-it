<template>
    <modal name="startmodal" v-bind:clickToClose="false">
        <div class="modal-content">
        <h1>Ambientia Speed Race</h1>
        <p>Atri Ambientialainen from Ambientia has been developing simulator for
            accelerating a car to maximum speed.<br/>
            <br/>
            Your mission, should you choose to accept it, is to help Atri A. to develop JavaScript
            application that gains maximum speed. <br>
            Having said that,  notice that the car might behave in strange ways!
             <br>
             <br>
            Currently speed to beat is: {{fastest}} km/h
        </p>
        <button @click.prevent="$emit('start');">Begin the challenge</button>
        </div>
    </modal>
</template>
<script>
export default {
    name: 'StartModal',
    props: ['fastest'],
}
</script>

<style scoped>
button {
    margin-top: 50px;
    font-size: 14pt;
    border-radius: 5px;
    background-color: #4CAF50;
    padding: 5px 10px;
}
</style>
