<template>
  <nav class="main-nav">
      <div class="main-nav__items">
        <ul class="main-nav__items--links">
          <router-link to="/" activeClass="active" tag="li" class="main-nav__items--brand">Stock Trader</router-link>
          <router-link to="/market" activeClass="active" tag="li"><a>Market</a></router-link>
          <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
        </ul>
        <div class="main-nav__items--center">
        </div>  
          <ul class="main-nav__items--info">
              <li><a href="#" @click="endDay">End Day</a></li>
              <li><div class="funds">Funds:&nbsp;{{ funds | toCurrency }}</div></li>
          </ul>
      </div>
  </nav>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
      data() {
          return {
          }
      },
      computed: {
        funds() {
          return this.$store.getters.funds;
        }
      },
      methods: {
        ...mapActions({
          randomizeStocks: 'randomizeStocks'
        }),
        endDay() {
            this.randomizeStocks();
        }
      }

  }
</script>

<style scoped>
  .main-nav {
    background-color: #f2f2f2;
    border-radius: 4px;
    font-size: 1rem;
    min-width: 17rem;
  }

  .main-nav__items {
    display:grid;
    grid-template-columns: 1fr;
  }

  .main-nav a {
    text-decoration: none;
    color:black;
  }

  .main-nav li {
    list-style-type: none;
    padding: 10px;
    cursor: pointer;
  }

  .main-nav__items--links {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .main-nav__items--brand {
    font-size: 1.3rem;
  }

  .main-nav__items--center {
    display:block;
  }

  .main-nav__items--info {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
  }

  .funds {
    font-weight: bold;
  }

  @media (min-width: 39rem ) {
    .main-nav__items {
      grid-template-columns: 1fr auto 1fr
    }

  }
</style>


