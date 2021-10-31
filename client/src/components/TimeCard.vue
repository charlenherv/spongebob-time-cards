<template>
  <div class="TimeCard_Container" :data-responsive="responsiveLevel">
    <!-- Card for Display-->
    <div
      ref="Card"
      class="TimeCard"
      :style="styleObjectDisplay"
      v-resize="responsive"
    >
      <div
        ref="Text"
        class="TimeCard_Text"
        v-if="backgroundRendered"
        :style="'transform: translate(-50%,-50%)'"
      >
        <span class="Number">{{ displayNumber }}</span
        ><br />
        <span class="Unit">{{ displayUnit }}</span
        ><br />
        <span class="Later">Later...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import numberConverter from "number-to-words";
import html2canvas from "html2canvas";
import FastAverageColor from "fast-average-color";
import tinycolor from "tinycolor2";
import resize from "vue-resize-directive";

export default {
  name: "TimeCard",
  props: {
    number: Number,
    unit: String,
    background: String,
  },
  data() {
    return {
      backgroundRendered: false,
      backgroundColor: "transparent",
      textColor: "FFFFFF",
      textShadowColor: "EF4BC3",

      responsiveLevel: 1,
    };
  },
  methods: {
    saveCard() {
      const appData = this;

      Vue.nextTick(function () {
        printToFile();
      });

      function saveAs(blob, name) {
        var blobUrl = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = blobUrl;
        link.download = name;
        link.click();
      }
      function printToFile() {
        html2canvas(appData.$refs.Card, {
          scrollX: 0,
          scrollY: -window.scrollY,
          scale: 3
        })
          .then(function (canvas) {
            canvas.toBlob(
              function (blob) {
                saveAs(blob, "sbtimecard.png");
              },
              "image/png",
              1
            );
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    processBackground() {
      const appData = this;
      const fac = new FastAverageColor();
      const card = appData.$refs.Card;

      appData.backgroundRendered = false; // Turn text off, to not interfere with background color test
      if (card && appData.backgroundCorrected) {
        const testImage = document.createElement("img");
        testImage.src = "backgrounds/" + appData.backgroundCorrected;
        fac
          .getColorAsync(testImage)
          .then((color) => {
            appData.backgroundColor = color;
            if (color.isDark) {
              appData.textColor = "FFFFFF"; // White;
            } else {
              appData.textColor = "081D49"; // Navy blue;
              appData.textShadowColor = false; // Set text shadow to complementary color
            }
            appData.textShadowColor = hexBrightener(
              hexToComplimentary(color.hex)
            ); // Set text shadow to complementary color
            appData.backgroundRendered = true; // Turn text on
          })
          .catch((e) => {
            console.log(e); // Error
          });
      }
      function hexToComplimentary(hex) {
        // Compiled by Edward https://stackoverflow.com/questions/1664140/js-function-to-calculate-complementary-colour
        // Convert hex to rgb
        // Credit to Denis http://stackoverflow.com/a/36253499/4939630
        var rgb =
          "rgb(" +
          (hex = hex.replace("#", ""))
            .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
            .map(function (l) {
              return parseInt(hex.length % 2 ? l + l : l, 16);
            })
            .join(",") +
          ")";

        // Get array of RGB values
        rgb = rgb.replace(/[^\d,]/g, "").split(",");

        var r = rgb[0],
          g = rgb[1],
          b = rgb[2];

        // Convert RGB to HSL
        // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
        r /= 255.0;
        g /= 255.0;
        b /= 255.0;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h,
          s,
          l = (max + min) / 2.0;

        if (max == min) {
          h = s = 0; //achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);

          if (max == r && g >= b) {
            h = (1.0472 * (g - b)) / d;
          } else if (max == r && g < b) {
            h = (1.0472 * (g - b)) / d + 6.2832;
          } else if (max == g) {
            h = (1.0472 * (b - r)) / d + 2.0944;
          } else if (max == b) {
            h = (1.0472 * (r - g)) / d + 4.1888;
          }
        }

        h = (h / 6.2832) * 360.0 + 0;

        // Shift hue to opposite side of wheel and convert to [0-1] value
        h += 180;
        if (h > 360) {
          h -= 360;
        }
        h /= 360;

        // Convert h s and l values into r g and b values
        // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;

          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        // Convert r b and g values to hex
        rgb = b | (g << 8) | (r << 16);
        return (0x1000000 | rgb).toString(16).substring(1);
      }
      function hexBrightener(hex) {
        let finalHex = tinycolor("#" + hex)
          .saturate(75)
          .brighten(10)
          .lighten(10)
          .toString();
        finalHex = finalHex.replace("#", "");
        return finalHex;
      }
    },
    responsive() {
      const appData = this;
      const card = appData.$refs.Card;
      const dimensions = card.getBoundingClientRect();
      const width = dimensions.width;
      if (width >= 700) {
        appData.responsiveLevel = 1;
      } else if (width >= 600 && width < 700) {
        appData.responsiveLevel = 2;
      } else if (width >= 500 && width < 600) {
        appData.responsiveLevel = 3;
      } else if (width >= 400 && width < 500) {
        appData.responsiveLevel = 4;
      } else if (width >= 300 && width < 400) {
        appData.responsiveLevel = 5;
      } else if (width >= 200 && width < 300) {
        appData.responsiveLevel = 6;
      }
    },
  },
  computed: {
    displayNumber() {
      const startingNumber = this.number;
      let finalNumber = this.number;
      let capitalize = false;

      // Word numbers
      if (
        startingNumber <= 20 ||
        startingNumber === 30 ||
        startingNumber === 40 ||
        startingNumber === 50 ||
        startingNumber === 60 ||
        startingNumber === 70 ||
        startingNumber === 80 ||
        startingNumber === 90 ||
        startingNumber === 100 ||
        startingNumber === 1000 ||
        startingNumber === 1000000 ||
        startingNumber === 1000000000 ||
        startingNumber === 1000000000000 ||
        startingNumber === 1000000000000000
      ) {
        finalNumber = numberConverter.numberToWords.toWords(startingNumber); // Convert number to words
        capitalize = true;
      }

      // Capitalize
      if (capitalize) {
        finalNumber =
          finalNumber.charAt(0).toUpperCase() + finalNumber.slice(1);
      }

      return finalNumber;
    },
    displayUnit() {
      let finalUnit = this.unit;
      if (this.number === 1) {
        // If only one
        if (finalUnit === "eternities") {
          finalUnit = "eternity";
        } else if (finalUnit === "centuries") {
          finalUnit = "century";
        } else {
        /*
        else if (finalUnit === 'oftears') {
          finalUnit = 'tear'
        } */
          finalUnit = finalUnit.slice(0, -1); // Remove letter s
        }
      }

      finalUnit = finalUnit.charAt(0).toUpperCase() + finalUnit.slice(1);
      return finalUnit;
    },
    backgroundCorrected() {
      const appData = this;
      const finalImage = appData.background
        ? appData.background.replaceAll(" ", "%20")
        : false;
      return finalImage;
    },
    styleObjectDisplay() {
      const appData = this;
      return {
        color: "#" + appData.textColor,
        "text-shadow": appData.textShadowColor
          ? "-0.2em 0.2em 0px " + "#" + appData.textShadowColor
          : "none",
        "background-image": appData.backgroundCorrected
          ? "url(backgrounds/" + appData.backgroundCorrected + ")"
          : "none",
        "background-color": appData.backgroundColor.hex,
      };
    },
  },
  watch: {
    background: {
      immediate: true,
      handler() {
        this.processBackground();
      },
    },
  },
  directives: {
    resize,
  },
  mounted() {
    const appData = this;
    appData.processBackground();    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@font-face {
  font-family: "some_time_laterregular";
  src: url("../assets/fonts/some_time_later-webfont.woff2") format("woff2"),
    url("../assets/fonts/some_time_later-webfont.woff") format("woff");
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
  padding-top: 75%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .TimeCard_Text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: "some_time_laterregular";
    line-height: 85%;
    font-size: 120px;
    white-space: nowrap;

    .Number,
    .Unit,
    .Later {
      &:first-letter {
        font-size: 200%;
      }
      font-variant: small-caps;
    }
  }
}
[data-responsive="1"] {
  .TimeCard_Text {
    font-size: 110px;
  }
}
[data-responsive="2"] {
  .TimeCard_Text {
    font-size: 96px;
  }
}
[data-responsive="3"] {
  .TimeCard_Text {
    font-size: 80px;
  }
}
[data-responsive="4"] {
  .TimeCard_Text {
    font-size: 60px;
  }
}
[data-responsive="5"] {
  .TimeCard_Text {
    font-size: 42px;
  }
}
[data-responsive="6"] {
  .TimeCard_Text {
    font-size: 32px;
  }
}
</style>
