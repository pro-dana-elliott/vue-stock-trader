<template>
    <div class="comp-stock">
        <div class="comp-stock__block">
            <div class="comp-stock__block--heading" :class="headingColor">
                <div class="comp-stock__block--title">
                    <div class="stock-name">{{stock.name}}</div>
                    <div class="stock-block">(
                        <div class="stock-price"> Price:&nbsp;{{stock.price}}</div>
                        <div class="class-amount" v-if="isPortfolio"> | Quantity:&nbsp;{{stock.quantity}}</div>)   
                    </div>
                </div>
            </div>
            <div class="comp-stock__block--body">
                <div class="comp-stock__block--bodyleft">
                    <input
                        type="number"
                        placeholder="quantity"
                        v-model.number="quantity"
                        :class="{danger: insufficientQuantity | insufficientFunds}"
                    >
                    <div class="purchasePrice" v-if="purchasePrice > 0">{{purchasePrice | toCurrency}}</div>
                </div>
                <div class="comp-stock__block--bodyright">
                    <button v-if="isPortfolio == false"
                        @click="buyStock"
                        :class="{'danger-msg': insufficientQuantity | insufficientFunds}" 
                        :disabled="!Number.isInteger(quantity) || quantity <= 0 || insufficientFunds"
                    >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}</button>
                    <button v-if="isPortfolio == true" 
                        @click="sellStock"
                        :class="{'danger-msg': insufficientQuantity | insufficientFunds}"  
                        :disabled="!Number.isInteger(quantity) || quantity <= 0 || insufficientQuantity"
                    >{{ insufficientQuantity ? 'Not enough Stocks' : 'Sell'}}</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        props: {'stock': Object, 'isPortfolio': Boolean },
        data() {
            return {
                quantity: 0
            }
        },
        methods: {
            ...mapActions({
                placeSellOrder: 'sellStock'
            }),
            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                this.placeSellOrder(order);
                this.quantity = 0;
            },
            buyStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                this.$store.dispatch('buyStock', order);
                this.quantity = 0;
            }
        },
        computed: {
            insufficientQuantity() {
                return this.quantity > this.stock.quantity;
            },
            funds() {
               return this.$store.getters.funds;
            },
            insufficientFunds() {
                return this.quantity * this.stock.price > this.funds;
            },
            purchasePrice() {
                return this.quantity * this.stock.price;
            },
            headingColor() {
                return {
                   portfolioColor: this.isPortfolio,
                   marketColor: !this.isPortfolio 
                };
            }
        }
    }
</script>

<style scoped>
    .comp-stock {
        min-width: 14rem;
        max-width: 25rem;
        margin: 10px;
    }

    .comp-stock__block {
        border: 1px solid lightgreen;
        border-radius: 6px;
    }

    .comp-stock__block--heading {
        display:block;
    }

    .comp-stock__block--title {
        margin: 0;
        padding: 10px;
    }

    .stock-name, .stock-block, .stock-price, .class-amount {
        display:inline;
    }

    .comp-stock__block--body {
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 100%;
        padding: 10px 20px;;
    }
    
    .comp-stock__block--bodyleft {
        display:flex;
        flex-direction: column;
        /* justify-content: flex-start; */
        Align-items: center;
    }

    .comp-stock__block--bodyleft input {
        padding: 5px 10px;
        border-radius: 4px;
        width: 70%;
        outline: none;
    }

    .comp-stock__block--bodyright {
        display:flex;
        Justify-content: flex-end;
        Align-items: center;
    }

    .comp-stock__block--bodyright button {
        padding: 5px 10px;
        border-radius: 4px;
    }

    .portfolioColor {
        background-color: lightblue;
    } 

    .marketColor {
        background-color: lightgreen;
    }

    .purchasePrice {
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .danger {
        border: 1px solid red;
    }

    .danger-msg {
        color: red;
    }
</style>

