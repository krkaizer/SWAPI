(function(){"use strict";var e={670:function(e,n,t){var r=t(751),a=t(641),u=t.p+"img/star-wars-logo-cropped.deffdead.jpg",o={class:"container"},s={class:"content"};function i(e,n,t,r,i,l){var c=(0,a.g2)("CharacterList");return(0,a.uX)(),(0,a.CE)("div",o,[n[0]||(n[0]=(0,a.Lk)("header",{class:"header"},[(0,a.Lk)("img",{src:u,alt:""})],-1)),(0,a.Lk)("section",s,[(0,a.bF)(c)])])}var l=t(635),c=t(33),v=t(953),f=t(335),d={class:"search_bar"},p={key:0,class:"error"},h={key:1,class:"search_results"},_={class:"search_results__list"},b=["href"],g={key:0,class:"search_results__pagination"},k=["disabled"],y=["disabled"],m={key:1,class:"search_results__empty"},C=(0,a.pM)({__name:"CharacterList",setup:function(e){var n=(0,v.KR)([]),t=(0,v.KR)(""),u=(0,v.KR)(null),o=(0,v.KR)(null),s=(0,v.KR)(""),i=(0,v.KR)(!1);function C(e){return void 0===e&&(e=null),(0,l.sH)(this,void 0,void 0,(function(){var r,a;return(0,l.YH)(this,(function(l){switch(l.label){case 0:s.value="",l.label=1;case 1:return l.trys.push([1,3,,4]),[4,f.A.get(e||"https://swapi.dev/api/people/?search=".concat(t.value))];case 2:return r=l.sent(),u.value=r.data.next,o.value=r.data.previous,n.value=r.data.results,[3,4];case 3:return a=l.sent(),console.log(a.message),s.value="Data loading failed",[3,4];case 4:return n.value.length&&(i.value=!0,console.log("All characters are loaded.")),[2]}}))}))}function L(){return(0,l.sH)(this,void 0,void 0,(function(){return(0,l.YH)(this,(function(e){return null!==u.value&&C(u.value),[2]}))}))}function w(){return(0,l.sH)(this,void 0,void 0,(function(){return(0,l.YH)(this,(function(e){return null!==o.value&&C(o.value),[2]}))}))}return(0,a.sV)((function(){C()})),function(e,l){return(0,a.uX)(),(0,a.CE)(a.FK,null,[l[5]||(l[5]=(0,a.Lk)("h2",{class:"content__header"},"Star Wars characters",-1)),(0,a.Lk)("div",d,[l[4]||(l[4]=(0,a.Lk)("h3",{class:"search_bar__header"},"Find character",-1)),(0,a.bo)((0,a.Lk)("input",{class:"search_bar__input",type:"search",name:"",id:"",placeholder:"Enter character name...","onUpdate:modelValue":l[0]||(l[0]=function(e){return t.value=e}),onInput:l[1]||(l[1]=function(e){return C()})},null,544),[[r.Jo,t.value]])]),s.value?((0,a.uX)(),(0,a.CE)("div",p,(0,c.v_)(s.value),1)):(0,a.Q3)("",!0),s.value?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",h,[(0,a.Lk)("ul",_,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(n.value,(function(e){return(0,a.uX)(),(0,a.CE)("li",{key:e.name},[(0,a.Lk)("a",{class:"search_results__item",href:e.url,target:"_blank"},(0,c.v_)(e.name),9,b)])})),128))]),n.value.length>0?((0,a.uX)(),(0,a.CE)("div",g,[(0,a.Lk)("button",{disabled:!o.value,class:"pagination__button",onClick:l[2]||(l[2]=function(e){return w()})}," Previous page ",8,k),(0,a.Lk)("button",{disabled:!u.value,class:"pagination__button",onClick:l[3]||(l[3]=function(e){return L()})}," Next page ",8,y)])):(0,a.Q3)("",!0),i.value&&0===n.value.length?((0,a.uX)(),(0,a.CE)("p",m," Empty result. ")):(0,a.Q3)("",!0)]))],64)}}}),L=t(262);const w=(0,L.A)(C,[["__scopeId","data-v-12e1997c"]]);var O=w,E=(0,a.pM)({name:"App",components:{CharacterList:O}});const j=(0,L.A)(E,[["render",i]]);var K=j;(0,r.Ef)(K).mount("#app")}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var u=n[r]={exports:{}};return e[r](u,u.exports,t),u.exports}t.m=e,function(){var e=[];t.O=function(n,r,a,u){if(!r){var o=1/0;for(c=0;c<e.length;c++){r=e[c][0],a=e[c][1],u=e[c][2];for(var s=!0,i=0;i<r.length;i++)(!1&u||o>=u)&&Object.keys(t.O).every((function(e){return t.O[e](r[i])}))?r.splice(i--,1):(s=!1,u<o&&(o=u));if(s){e.splice(c--,1);var l=a();void 0!==l&&(n=l)}}return n}u=u||0;for(var c=e.length;c>0&&e[c-1][2]>u;c--)e[c]=e[c-1];e[c]=[r,a,u]}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/SWAPI/"}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var a,u,o=r[0],s=r[1],i=r[2],l=0;if(o.some((function(n){return 0!==e[n]}))){for(a in s)t.o(s,a)&&(t.m[a]=s[a]);if(i)var c=i(t)}for(n&&n(r);l<o.length;l++)u=o[l],t.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return t.O(c)},r=self["webpackChunkswapi_project"]=self["webpackChunkswapi_project"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(670)}));r=t.O(r)})();
//# sourceMappingURL=app.6d0a195e.js.map