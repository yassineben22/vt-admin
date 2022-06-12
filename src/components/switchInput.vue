<template>
    <label class="switch">
        <input type="checkbox" class="d-none" v-model="checkboxValue">
        <span class="slider round"></span>
    </label>
</template>

<script>
    export default {
        props: ['modelValue'],
        computed: {
            checkboxValue: {
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
    .switch {
        border-radius: 34px;
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
    box-shadow: 0px 0px 14.9729px 3.45528px rgba(140, 140, 140, 0.12);
    }
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    box-shadow: 0px 0px 14.9729px 3.45528px rgba(140, 140, 140, 0.12);
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #5a58c3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #5a58c3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
</style>