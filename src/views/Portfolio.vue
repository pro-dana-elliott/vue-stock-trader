<template>
    <div class="stock-layout">
        <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock" :is-portfolio="true"></app-stock>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Stock from '../components/Stock.vue';

    export default {
        computed: {
            ...mapGetters({
                stocks: 'stockPortfolio'
            })
        },
        components: {
            appStock: Stock
        }
    }
</script>

<style>
    .stock-layout {
        display: flex;
        flex-wrap: wrap;
    }
</style>