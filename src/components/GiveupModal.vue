<template>
    <modal name="giveupmodal">
        <div class="modal-content">
            <h1>Do you really want to give up?</h1>
            <br/>
            Think fast, clock is still ticking...<br/>
            <br/>
            <button class="nobutton" @click="$emit('resume')">No</button>
            <button class="yesbutton" @click="$emit('giveup')">Yes</button>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'GiveupModal',
}
</script>

<style scoped>
button {
    margin-top: 50px;
    font-size: 14pt;
    border-radius: 5px;
    padding: 5px 10px;
}

.nobutton {
    background-color: #FF2250;
    margin-right: 50px;
}

.yesbutton {
    background-color: #4CAF50;
}
</style>
