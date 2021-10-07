<template>
  <main id="main">
  <!-- header -->
  <header id="header">
    <img id="header-logo" src="https://i.ibb.co/vYqDnfm/bmfLogo.png">
    <h1 id="header-title">BMF travel</h1>
  </header>
  <!-- interaction area -->
  <section id="panel">
    <!-- input area -->
    <div id="panel-input">
      <form id="panel-input-form">
        <!-- pesquisar o container para fazer o ngFor -->
        <label for="departure-country">País de origem:</label>
        <select v-model="departureCountry" name="departure-country" id="panel-input-form-departure-country">
          <option v-for="country, index in countries" :key="index" :value="country.country">{{country.country}}</option>
        </select>
        <label for="departure-city">Cidade de Origem</label>
        <select v-model="departureCity" name="departure-city" id="panel-input-form-departure-city">
          <option v-for="city, index in departureCities" :key="index" :value="city.city">{{city.city}}</option>
        </select>
        <label for="arrival-country">País de destino</label>
        <select v-model="arrivalCountry" name="arrival-country" id="panel-input-form-arrival-country">
          <option v-for="country, index in countries" :key="index" :value="country.country">{{country.country}}</option>
        </select>
        <label for="arrival-city">Cidade de destino</label>
        <select v-model="arrivalCity" name="arrival-city" id="panel-input-form-arrival-city">
          <option v-for="city, index in arrivalCities" :key="index" :value="city.city">{{city.city}}</option>
        </select>
        <label for="adults">Adultos</label>
        <input v-model="adults" type="number" name="panel-input-form-adults"/>
        <label for="children">Crianças</label>
        <input v-model="children" type="number" name="children" id="panel-input-form-children">
        <div id="panel-input-forrm-class">
          <label class="input-class" for="panel-input-form-economic"><input v-model="selectedClass" type="radio" name="class" id="panel-input-form-economy" value="Econômica"> Econômica</label>
          <label class="input-class" for="panel-input-form-executive"><input v-model="selectedClass" type="radio" name="class" id="panel-input-form-executive" value="Executiva"> Executiva</label>
        </div>
        <label for="miles">Utilizar {{usedMiles}} milhas</label>
        <input v-model="usedMiles" type="range" name="miles" id="panel-input-form-miles" min="0" :max="maxMiles" >
      </form>
    </div>
    <!-- output area -->
    <div id="panel-output">
      <h4 id="panel-output-title">Resumo da viagem</h4>
      <p class="panel-output-parag">País de origem: {{departureCountry}} </p>
      <p class="panel-output-parag">Cidade de origem: {{departureCity}} </p>
      <p class="panel-output-parag">País de destino: {{arrivalCountry}} </p>
      <p class="panel-output-parag">Cidade de destino: {{arrivalCity}} </p>
      <p class="panel-output-parag">distâmcia: {{distance}} km </p>
      <p class="panel-output-parag"> {{adults}} adulto(s), {{children}} criança(s) </p>
      <p class="panel-output-parag">Tipo de vôo Classe {{selectedClass}} </p>
      <p class="panel-output-parag">R$ 19,00 por adulto </p>
      <p class="panel-output-parag">R$ 7,00 por criança </p>
      <p class="panel-output-parag">Milhas: {{usedMiles}} </p>
      <p class="panel-output-parag">Valor abatido por milhas: R$ 19,00 </p>
      <p class="panel-output-parag">Total: R$ 19,00 </p>
    </div>
  </section>
</main>
</template>

<script>
// import { getDistance, getLatitude, getLongitude } from '../src/services';
import { getLatitude, getLongitude, getDistance } from '../src/services/service';

export default {
  data(){
    return {
      baseUrl:"http://localhost:3000/countries",
      countries:[],
      departureCities:[],
      arrivalCities:[],
      departureCountry:null,
      departureCity: null,
      arrivalCountry: null,
      arrivalCity: null,
      adults: 1,
      children: 0,
      selectedClass: null,
      usedMiles: 19,
      maxMiles: 1000,
      distance: 19,
    }
  },

  computed: {
    
    originLatitude: function () {
      return getLatitude(this.departureCities, this.departureCity);
    },

    originLongitude: function () {
      return getLongitude(this.departureCities, this.departureCity);
    },

    arrivalLatitude: function () {
      return getLatitude(this.arrivalCities, this.arrivalCity);
    },

    arrivalLongitude: function () {
      return getLongitude(this.arrivalCities, this.arrivalCity);
    },
  },

  watch: {
    departureCountry: function (newV, oldV) {
      console.log(`departureCountry Watched - ${oldV}`);
      fetch(`${this.baseUrl}?country=${newV}`)
        .then(res => res.json())
        .then(data => {
          this.departureCities = data[0].cities;
        });
    },

    arrivalCountry: function (newV, oldV) {
      console.log(`departureCity Watched - ${oldV}`);
      fetch(`${this.baseUrl}?country=${newV}`)
        .then(res => res.json())
        .then(data => {
          this.arrivalCities = data[0].cities;
        });
    },

    arrivalCity: function () {
      this.distance = getDistance(this.originLatitude, this.originLongitude, this.arrivalLatitude, this.arrivalLongitude).toFixed(3);
      this.distance = this.distance.replace(".", ",");
    }
  },

  beforeMount() {
    fetch(this.baseUrl)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.countries.push(data[i]);
          console.log(data[i], typeof (data[i]));
        }
        console.log(this.countries)
      });
  },


}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#main {
  width: 100%;
  height: 100%;
}

#header {
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  background: #b3b3b3;
}

#header-logo {
  width: 20%;
  height: auto;
}

#header-title {
  align-self: flex-end;
  color: darkorange;
  margin: auto 20%;
}

#panel {
  margin: 1rem 0 0 1rem;
}

#panel-input {
  display: flex;
  border: 1px solid #000;
  width: 30%;
  min-width: 200px;
}

#panel-input-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: .5rem;
  margin: auto;
}

.input-class {
  display: inline-flex;
}

#panel-output {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid #000;
  width: 30%;
  min-width: 200px;
  margin-top: 1rem;
}

#panel-output-title {
  margin: 1rem auto;
}

.panel-output-parag {
  margin: .5rem auto;
}

  

</style>
