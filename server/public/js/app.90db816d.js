(function(e){function t(t){for(var n,s,i=t[0],c=t[1],u=t[2],d=0,p=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var c=r[i];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},o=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0e43":function(e,t,r){"use strict";r("465b")},"465b":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"App",attrs:{id:"app"}},[n("div",{staticClass:"AppContainer"},[n("img",{staticClass:"Logo",attrs:{src:r("cf05"),alt:"BobSponge Time Cards"}}),n("div",{staticClass:"DivisionLine"}),e.backgrounds?n("TimeCard",{ref:"TimeCard",attrs:{number:e.number,unit:e.unit,background:e.background}}):e._e(),n("button",{staticClass:"SaveButton",on:{click:e.saveCard}},[e._v("Save Card")]),n("div",{staticClass:"DivisionLine"}),n("div",{staticClass:"Controls"},[n("div",{staticClass:"ControlSection"},[n("span",{staticClass:"ControlLabel"},[e._v("Number")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputNumber,expression:"inputNumber"}],attrs:{type:"text"},domProps:{value:e.inputNumber},on:{keypress:function(t){return e.validateNumber(t)},input:function(t){t.target.composing||(e.inputNumber=t.target.value)}}})]),n("div",{staticClass:"ControlSection"},[n("span",{staticClass:"ControlLabel"},[e._v("Unit")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.unit,expression:"unit"}],staticClass:"custom-select",attrs:{id:"unit"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.unit=t.target.multiple?r:r[0]}}},e._l(e.units,(function(t,r){return n("option",{key:r,staticClass:"UnitOption",domProps:{value:t.val}},[e._v(" "+e._s(e._f("capitalize")(t.label?t.label:t.val))+" ")])})),0)]),n("div",{staticClass:"ControlSection"},[n("span",{staticClass:"ControlLabel"},[e._v("Background")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.background,expression:"background"}],staticClass:"custom-select",attrs:{id:"background"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.background=t.target.multiple?r:r[0]}}},e._l(e.backgrounds,(function(t,r){return n("option",{key:r,staticClass:"BackgroundOption",domProps:{value:t}},[e._v(" "+e._s(e._f("removeExtensionFilter")(t))+" ")])})),0)])])],1)])},o=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"TimeCard_Container",attrs:{"data-responsive":e.responsiveLevel}},[r("div",{directives:[{name:"resize",rawName:"v-resize",value:e.setResponsiveLevel,expression:"setResponsiveLevel"}],ref:"Card",staticClass:"TimeCard",style:e.styleObjectDisplay},[e.backgroundRendered?r("div",{ref:"Text",staticClass:"TimeCard_Text",style:"transform: translate(-50%,-50%)"},[r("span",{staticClass:"Number"},[e._v(e._s(e.displayNumber))]),r("br"),r("span",{staticClass:"Unit"},[e._v(e._s(e.displayUnit))]),r("br"),r("span",{staticClass:"Later"},[e._v("Later...")])]):e._e()])])},i=[],c=r("81b2"),u=r.n(c),l=r("c0e9"),d=r.n(l),p=r("2831"),v=r("66cb"),m=r.n(v),b=r("428d"),g=r.n(b),f={name:"TimeCard",props:{number:Number,unit:String,background:String},data(){return{backgroundRendered:!1,backgroundColor:"transparent",textColor:"FFFFFF",textShadowColor:"EF4BC3",responsiveLevel:1}},methods:{saveCard(e){const t=this;function r(e,t){var r=URL.createObjectURL(e),n=document.createElement("a");n.href=r,n.download=t,n.click()}function a(){d()(t.$refs.Card,{scrollX:0,scrollY:-window.scrollY,scale:3}).then((function(t){t.toBlob((function(t){r(t,e)}),"image/png",1)})).catch((function(e){console.log(e)}))}n["a"].nextTick((function(){a()}))},processBackground(){const e=this,t=new p["a"],r=e.$refs.Card;if(e.backgroundRendered=!1,r&&e.backgroundCorrected){const r=document.createElement("img");r.src="backgrounds/"+e.backgroundCorrected,t.getColorAsync(r).then(t=>{e.backgroundColor=t,t.isDark?e.textColor="FFFFFF":(e.textColor="081D49",e.textShadowColor=!1),e.textShadowColor=a(n(t.hex)),e.backgroundRendered=!0}).catch(e=>{console.log(e)})}function n(e){var t="rgb("+(e=e.replace("#","")).match(new RegExp("(.{"+e.length/3+"})","g")).map((function(t){return parseInt(e.length%2?t+t:t,16)})).join(",")+")";t=t.replace(/[^\d,]/g,"").split(",");var r=t[0],n=t[1],a=t[2];r/=255,n/=255,a/=255;var o,s,i=Math.max(r,n,a),c=Math.min(r,n,a),u=(i+c)/2;if(i==c)o=s=0;else{var l=i-c;s=u>.5?l/(2-i-c):l/(i+c),i==r&&n>=a?o=1.0472*(n-a)/l:i==r&&n<a?o=1.0472*(n-a)/l+6.2832:i==n?o=1.0472*(a-r)/l+2.0944:i==a&&(o=1.0472*(r-n)/l+4.1888)}if(o=o/6.2832*360+0,o+=180,o>360&&(o-=360),o/=360,0===s)r=n=a=u;else{var d=function(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e},p=u<.5?u*(1+s):u+s-u*s,v=2*u-p;r=d(v,p,o+1/3),n=d(v,p,o),a=d(v,p,o-1/3)}return r=Math.round(255*r),n=Math.round(255*n),a=Math.round(255*a),t=a|n<<8|r<<16,(16777216|t).toString(16).substring(1)}function a(e){let t=m()("#"+e).saturate(75).brighten(10).lighten(10).toString();return t=t.replace("#",""),t}},setResponsiveLevel(){const e=this,t=e.$refs.Card,r=t.getBoundingClientRect(),n=r.width;n>=700?e.responsiveLevel=1:n>=600&&n<700?e.responsiveLevel=2:n>=500&&n<600?e.responsiveLevel=3:n>=400&&n<500?e.responsiveLevel=4:n>=300&&n<400?e.responsiveLevel=5:n>=200&&n<300&&(e.responsiveLevel=6)}},computed:{displayNumber(){const e=this.number;let t=this.number,r=!1;return(e<=20||30===e||40===e||50===e||60===e||70===e||80===e||90===e||100===e||1e3===e||1e6===e||1e9===e||1e12===e||1e15===e)&&(t=u.a.numberToWords.toWords(e),r=!0),r&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t},displayUnit(){let e=this.unit;return 1===this.number&&(e="eternities"===e?"eternity":"centuries"===e?"century":e.slice(0,-1)),e=e.charAt(0).toUpperCase()+e.slice(1),e},backgroundCorrected(){const e=this,t=!!e.background&&e.background.replaceAll(" ","%20");return t},styleObjectDisplay(){const e=this;return{color:"#"+e.textColor,"text-shadow":e.textShadowColor?"-0.2em 0.2em 0px #"+e.textShadowColor:"none","background-image":e.backgroundCorrected?"url(backgrounds/"+e.backgroundCorrected+")":"none","background-color":e.backgroundColor.hex}}},watch:{background:{immediate:!0,handler(){this.processBackground()}}},directives:{resize:g.a}},h=f,C=(r("0e43"),r("2877")),k=Object(C["a"])(h,s,i,!1,null,"33fbedae",null),y=k.exports,w={name:"App",title:"SpongeBob Time Card Generator",components:{TimeCard:y},computed:{units(){return this.$store.state.units},backgrounds(){return this.$store.state.backgrounds},randomBG(){return this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)]},number(){return this.inputNumber?parseFloat(this.inputNumber):2},cardSavedName(){return`SpongeBob Time Card - ${this.number} ${this.unit} Later`}},data(){return{inputNumber:2,unit:"hours",background:null}},methods:{saveCard(){const e=this;e.$refs.TimeCard.saveCard(e.cardSavedName)},validateNumber:function(e){e=e||window.event;var t=e.which?e.which:e.keyCode;if(!(t>31&&(t<48||t>57)&&46!==t))return!0;e.preventDefault()},getTitle(e){const{title:t}=e.$options;if(t)return"function"===typeof t?t.call(e):t},removeExtension(e){return e.replace(/\.[^/.]+$/,"")}},filters:{capitalize:function(e){let t=[];return e.split(" ").forEach(e=>{t.push(e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())}),t.join(" ")},removeExtensionFilter:function(e){return e.replace(/\.[^/.]+$/,"")}},watch:{randomBG(e){this.background=e}},mounted(){const e=this;e.$store.dispatch("getBackgrounds");const t=window.location.search,r=new URLSearchParams(t),n=r.get("number"),a=r.get("unit");n&&(e.inputNumber=n),a&&e.units.some(e=>e.val===a)&&(e.unit=a),(n||a)&&setTimeout((function(){e.saveCard()}),100)},created(){const e=this.getTitle(this);e&&(document.title=e)}},x=w,_=(r("5c0b"),Object(C["a"])(x,a,o,!1,null,null,null)),S=_.exports,L=r("2f62"),N=r("bc3a"),T=r.n(N);n["a"].use(L["a"]);var B=new L["a"].Store({state:{backgrounds:[],units:[{val:"seconds"},{val:"minutes"},{val:"hours"},{val:"days"},{val:"weeks"},{val:"fortnites"},{val:"months"},{val:"years"},{val:"decades"},{val:"centuries"},{val:"eternities"}]},mutations:{setBackgrounds(e,t){e.backgrounds=t}},actions:{getBackgrounds({commit:e}){T.a.get("/getBackgrounds").then(t=>{e("setBackgrounds",t.data)})}},modules:{}});n["a"].config.productionTip=!1,new n["a"]({store:B,render:e=>e(S)}).$mount("#app")},"5c0b":function(e,t,r){"use strict";r("9c0c")},"9c0c":function(e,t,r){},cf05:function(e,t,r){e.exports=r.p+"img/logo.333aa093.png"}});
//# sourceMappingURL=app.90db816d.js.map