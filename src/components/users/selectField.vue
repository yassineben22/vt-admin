<template>
    <div class="input-field">
        <label class="fw-bold">{{ label }} <span class="text-danger">*</span></label>
        <select v-model="inputValue" v-bind:readonly="readOnly">
            <option v-for="(option, i) in options" :key="i" :value="option">{{ option }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['label', 'modelValue', 'readOnly', 'options', 'selectedOption'],
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

<style scoped>
.input-field label {
    font-size: 15px;
}
.input-field select {
    appearance: none;
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
</style>