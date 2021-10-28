<template>
<div class="TimeCard_Container">
  <div ref="Card" class="TimeCard" 
    :style="styleObject"
  >
    <div class="TimeCard_Text">
        <span class="Value">{{displayNumber}}</span><br>
        <span class="Units">{{displayUnit}}</span><br>
        <span class="Later">Later...</span>
    </div>
  </div>
</div>
</template>

<script>
import numberConverter from 'number-to-words';
import html2canvas from 'html2canvas';

export default {
  name: 'TimeCard',
  props: {
    number: Number,
    unit: String,
    background: String
  },
  methods: {
    saveCard() {
      const appData = this;
      console.log('saveCard');
      printToFile();
      function saveAs(blob, name) {
        var blobUrl = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = blobUrl;
        link.download = name;
        link.click();
      }
      function printToFile() {
          html2canvas(appData.$refs.Card)
          .then(function (canvas) {
            canvas.toBlob(function(blob) {
              saveAs(blob, "sbtimecard.png");
            }, "image/png", 1);
          })
          .catch(function (err) { console.log(err); });
      }
    }
  },
  computed: {
    displayNumber() {
      let finalNumber = this.number;
      if (
        finalNumber <= 20 || 
        finalNumber === 30 ||
        finalNumber === 40 ||
        finalNumber === 50 ||
        finalNumber === 60 ||
        finalNumber === 70 ||
        finalNumber === 80 ||
        finalNumber === 90
      ) {
        finalNumber = numberConverter.numberToWords.toWords(finalNumber); // Convert number to words
        finalNumber = finalNumber.charAt(0).toUpperCase() + finalNumber.slice(1); // Capitalize first letter
      }
      return finalNumber;
    },
    displayUnit() {
      let finalUnit = this.unit;
      if (this.number === 1) { // If only one
        if (finalUnit === 'eternities') {
          finalUnit = 'eternity';
        } 
        else if (finalUnit === 'centuries') {
          finalUnit = 'century';
        }
        /*
        else if (finalUnit === 'oftears') {
          finalUnit = 'tear'
        } */
        else {
          finalUnit = finalUnit.slice(0, -1); // Remove letter s
        }
      }
      return finalUnit;
    },
    styleObject() {
      const filename = this.background.replaceAll(' ', '%20');
      return {
        background: "url(backgrounds/"+ filename +")"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @font-face {
      font-family: 'some_time_laterregular';
      src: url('../assets/fonts/some_time_later-webfont.woff2') format('woff2'),
          url('../assets/fonts/some_time_later-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;

  }

  .TimeCard_Container {
    max-width: 700px;
    margin: 0 auto;
  }
  .TimeCard {
    position: relative;
    overflow: hidden;
    height: 0;
    width: 100%;
    padding-top: 56.25%;
    background-position: center;
    background-size: cover;
    
    .TimeCard_Text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: #D4DC51;
      text-shadow: -5px 4px 0px #EF4BC3;
      font-family: 'some_time_laterregular';
      font-size: 100px;
      line-height: 85%;
    }
  }
</style>
