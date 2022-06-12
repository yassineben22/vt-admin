<template>
    <div class="input-field">
        <label class="fwb">{{ label }} <span class="text-danger">*</span></label>
        <input v-bind:class="type == 'password' ? 'password' : ''" v-bind:type="type" v-model="inputValue" v-bind:readonly="readOnly">
    </div>
</template>

<script>
    export default {
        props: ['label', 'type', 'modelValue', 'readOnly'],
        computed: {
            inputValue: {
                get(){
                    return this.modelValue
                },
                set(value){
                    this.$emit('update:modelValue', value)
                }
            }
        },
    }
</script>

<style>
.input-field label {
    font-size: 15px;
}
.input-field input {
    width: 100%;
    padding: 5px 10px 5px 10px;
    margin-top: 10px;
    height: 35px;
    border: 2px solid #5a58c3;
    border-radius: 17px;
    text-align: center;
    outline: none;
    font-size: 15px;
    background: none;
}
.input-field input[readonly] {
    background-color: #cfcfcf;
}
.input-field input[type="date"] {
    padding-left: 60px;
}
.fwb {
    font-family: main-bold;
}
</style>