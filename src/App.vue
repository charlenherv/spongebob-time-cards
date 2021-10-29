<template>
  <div id="app" class="App">
    <div class="AppContainer" v-if="loaded">
      <img class="Logo" src="@/assets/logo.png" alt="BobSponge Time Cards">

      <TimeCard ref="TimeCard" :number="number" :unit="unit" :background="background" />
      <button class="SaveButton" @click="saveCard">Save Card</button>
      <div class="Controls">
        <div class="ControlSection">
          <span class="ControlLabel">Number</span>
          <input type="text" v-model="inputNumber" />
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
              {{ unit.label ? unit.label : unit.val | capitalize}}
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
              {{ bg | removeExtension}}
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
  components: {
    TimeCard,
  },
  computed: {
    // Lists
    units() {
      return this.$store.state.units;
    },
    backgrounds() {
      return this.$store.state.backgrounds;
    },

    // Defaults
    randomBG() {
      return this.backgrounds[
        Math.floor(Math.random() * this.backgrounds.length)
      ];
    },

    // User Entries
    number() {
      return this.inputNumber ? parseFloat(this.inputNumber) : 2;
    },
  },
  data() {
    return {
      loaded: false,
      inputNumber: 2,
      unit: "hours",
      background: this.randomBG,
    };
  },
  methods: {
    saveCard() {
      const appData = this;
      appData.$refs.TimeCard.saveCard();
    }
  },
  filters: {
      capitalize: function (data) {
        let capitalized = []
        data.split(' ').forEach(word => {
          capitalized.push(
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
          )
        })
        return capitalized.join(' ')
      },
      removeExtension: function(data) {
        return data.replace(/\.[^/.]+$/, "")
      }
  },
  mounted() {
    const appData = this;
    appData.$store.dispatch("getBackgrounds");
    setTimeout(function(){
      appData.loaded = true;
      appData.background = appData.randomBG
    }, 500);
  }
};
</script>

<style lang="scss">
.Logo {
  width: 300px;
  margin-bottom: 10px;
}
.Header {
  font-size: 24px;
  text-transform: uppercase;
  color: rgb(23, 30, 54);
}
.Controls {
  padding: 20px;
  border-radius: 20px;
  input,
  select {
    cursor: pointer;
    outline: none;
    box-shadow: none;
    border: none;
    font-size: 14px;
  }
  .ControlSection {
    margin-bottom: 20px;
    text-align: left;
    .ControlLabel {
      margin-right: 10px;
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
.App {
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: sans-serif;
  text-align: center;
  background-image: url("~@/assets/main_bg.jpg");
  background-size: cover;
  color:white;
}
.AppContainer {
  box-sizing: border-box;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;

  background: rgba(255, 255, 255, 0.35);

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  // -webkit-animation: fade-in 0.25s ease-in both;
	// animation: fade-in 0.25s ease-in both;
}
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.UnitOption {
  &:first-letter {
    text-transform: capitalize;
  }
}



input, select {
  border-radius: 4px;
  padding: 10px;
}
</style>
