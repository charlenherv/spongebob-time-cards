<template>
  <div id="app" class="App">
    <div class="AppContainer">
      <img class="Logo" src="@/assets/logo.png" alt="BobSponge Time Cards" />

      <div class="DivisionLine"></div>

      <TimeCard
        v-if="backgrounds"
        ref="TimeCard"
        :number="number"
        :unit="unit"
        :background="background"
      />
      
      <button class="SaveButton" @click="saveCard">Save Card</button>

      <div class="DivisionLine"></div>

      <div class="Controls">
        <div class="ControlSection">
          <span class="ControlLabel">Number</span>
          <input
            type="text"
            v-model="inputNumber"
            @keypress="validateNumber($event)"
          />
        </div>

        <div class="ControlSection">
          <span class="ControlLabel">Unit</span>
          <select class="custom-select" id="unit" v-model="unit">
            <option
              v-for="(unit, index) in units"
              :key="index"
              :value="unit.val"
              class="UnitOption"
            >
              {{ unit.label ? unit.label : unit.val | capitalize }}
            </option>
          </select>
        </div>

        <div class="ControlSection">
          <span class="ControlLabel">Background</span>
          <select class="custom-select" id="background" v-model="background">
            <option
              v-for="(bg, index) in backgrounds"
              :key="index"
              :value="bg"
              class="BackgroundOption"
            >
              {{ bg | removeExtensionFilter }}
            </option>
          </select>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>

import TimeCard from "./components/TimeCard.vue";

export default {
  name: "App",
  title: "SpongeBob Time Card Generator",
  components: {
    TimeCard,
  },
  computed: {    
    units() {
      return this.$store.state.units;
    },
    backgrounds() {
      return this.$store.state.backgrounds;
    },
    randomBG() {
      return this.backgrounds[
        Math.floor(Math.random() * this.backgrounds.length)
      ];
    },
    number() {
      return this.inputNumber ? parseFloat(this.inputNumber) : 2;
    },
    cardSavedName() {
      return `SpongeBob Time Card - ${this.number} ${this.unit} Later`
    },
  },
  data() {
    return {
      inputNumber: 2,
      unit: "hours",
      background: null
    };
  },
  methods: {
    saveCard() {
      const appData = this;
      appData.$refs.TimeCard.saveCard(appData.cardSavedName);
    },
    validateNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getTitle (vm) {
    const { title } = vm.$options
    if (title) {
      return typeof title === 'function'
        ? title.call(vm)
        : title
    }
  },
  removeExtension(data) {
    return data.replace(/\.[^/.]+$/, "");
  }
  },
  filters: {
    capitalize: function (data) {
      let capitalized = [];
      data.split(" ").forEach((word) => {
        capitalized.push(
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      });
      return capitalized.join(" ");
    },
    removeExtensionFilter: function (data) {
      return data.replace(/\.[^/.]+$/, "");
    },
  },
  watch: {
    randomBG(newValue) {
      this.background = newValue;
    },
  },
  mounted() {
    const appData = this;

    // Load content - - - - - - -
    appData.$store.dispatch("getBackgrounds");

    // Accept URL params - - - - - - -

    // Get URL data
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const number = urlParams.get("number");
    const unit = urlParams.get("unit");

    // Update number
    if (number) {
      appData.inputNumber = number;
    }

    // Update unit
    if (unit && appData.units.some((unitObj) => unitObj.val === unit)) {
      appData.unit = unit;
    }

    // Auto print
    if (number || unit) {
      setTimeout(function () {
        appData.saveCard();
      }, 100);
    }
  },
  created () {
      const title = this.getTitle(this)
      if (title) {
        document.title = title
      }
    }
};
</script>

<style lang="scss">
body,html {
  margin: 0;
  padding: 0;
}
.App {
  overflow: auto;    
  height: 100vh;
    width: 100vw;
  font-family: sans-serif;
  text-align: center;
  background-image: url("~@/assets/main_bg.jpg");
  background-size: 800px 425px;
  color: white;
}
.AppContainer {
  box-sizing: border-box;
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;

  background: rgba(255, 255, 255, 0.35);

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.DivisionLine {
  height: 1px;
  margin: 10px 10px;
  background: white;
  opacity: 0.15;
}

.Logo {
  width: 300px;
  max-width: 100%;
}
.Header {
  font-size: 24px;
  text-transform: uppercase;
  color: rgb(23, 30, 54);
}

.Controls {
  padding: 20px;
  border-radius: 20px;
  text-align: left;
  input,
  select {
    cursor: pointer;
    outline: none;
    box-shadow: none;
    border: none;
    font-size: 14px;
  }
  .ControlSection {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 20px;
    margin-right: 20px;
    text-align: left;
    .ControlLabel {
      display: block;
      margin-right: 10px;
      margin-bottom: 2.5px;
      font-weight: bolder;
    }
  }
}
.SaveButton {
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  padding: 10px;
  margin: 10px 0;
  background: rgb(13, 108, 204);
  box-shadow: -4px 4px rgb(6, 57, 107);
  border: none;
  outline: none;
  text-transform: uppercase;
  font-weight: bolder;
  color: white;
}

input,
select {
  border-radius: 4px;
  padding: 10px;
}
</style>
