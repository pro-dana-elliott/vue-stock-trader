<template>
    <div class="stock-layout">
        <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock" :is-portfolio="false"></app-stock>
    </div>
</template>

<script>
import Stock from '../components/Stock.vue';

export default {
    components: {
        appStock: Stock
    },
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        }
    }
}
</script>

<style>
    .stock-layout {
        display: flex;
        flex-wrap: wrap;
    }
</style>



