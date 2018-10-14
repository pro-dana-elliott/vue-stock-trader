<template>
    <div>
        <h1>Trade or View your Portfolio</h1>
        <h2>Click on 'End Day' to begin a New Day!</h2>
        <hr>
        <p>Your Founds:&nbsp;{{funds | toCurrency }}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            funds() {
                return this.$store.getters.funds;
            }
        }
     }
    
</script>

<style>
</style>
