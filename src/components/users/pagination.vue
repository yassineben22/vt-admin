<template>
    <div class="numbers row d-flex justify-content-center">
        <span v-for="number in itemsCount" :class="['number', number == selected ? 'active' : '']" :key="number" @click="selected = number">
            {{ number }}
        </span>
    </div>
</template>

<script>
export default {
    props: ['modelValue', 'itemsCount'],
    computed: {
        selected: {
            get(){
                return this.modelValue
            },
            set(value){
                this.$emit('update:modelValue', value)
            }
        }
    }
}
</script>
<style scoped>
.numbers {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.numbers .number {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #5a58c3;
    background-color: #fff;
    color: #5a58c3;
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
}
.numbers .number.active {
    background-color: #5a58c3;
    color: #fff;
}
</style>