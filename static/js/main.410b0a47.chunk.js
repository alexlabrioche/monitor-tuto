(this["webpackJsonponboarding-monitor-poc"]=this["webpackJsonponboarding-monitor-poc"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),s=n(4),a=n.n(s),c=(n(9),n(2)),r=(n(10),n(0)),d={1:{title:"L\u2019acceuil regroupe les informations principales",desc:"Pour y acc\xe9der, cliquez sur l\u2019ic\xf4ne de maison dans le bas de l\u2019\xe9cran. Vous retrouverez un aper\xe7u rapide sur les informations principales de votre activit\xe9 des prochains jours"},2:{title:"Vos prochains jours",desc:"Les parties bleues correspondent aux le\xe7ons r\xe9serv\xe9es et les parties blanches aux cr\xe9neaux sans le\xe7on"},3:{title:"Le\xe7on en cours",desc:"La le\xe7on en cours est affich\xe9e dans le haut de l\u2019acceuil. Si ancune le\xe7on n\u2019est en cours, vous trouvrerez les informations de la prochaine le\xe7on"},4:{title:"Le\xe7on suivante",desc:"Vous avez acc\xe8s \xe0 tout le d\xe9tail de la prochaine le\xe7on : identit\xe9 de l\u2019\xe9l\xe8ve, type de le\xe7on et lieu de rendez-vous"},5:{title:"Le\xe7on en attente d\u2019actions",desc:"En bas de la page, vous trouverez toutes les le\xe7ons sur lesquelles une action de votre part est attendue : les comptes-rendu non effectu\xe9s, les propositions de le\xe7ons non accept\xe9es par les \xe9l\xe8ves..."},6:{title:"Actions rapides",desc:"Le bouton + permet de proposer des le\xe7ons, d\u2019ouvrir vos disponibilt\xe9s ou de mettre des indisponibilit\xe9s ponctuelles"}},l={hidden:{opacity:0},visible:{opacity:1}},u={hidden:{opacity:0,y:-10},visible:{opacity:1,y:0}};var b=function(){var e=Object(i.useState)("Onboarding_Ecran_0"),t=Object(c.a)(e,2),n=t[0],o=t[1],s=Object(i.useState)(1),a=Object(c.a)(s,2),b=a[0],p=a[1],v=Object(i.useState)(!0),j=Object(c.a)(v,2),h=j[0],m=j[1],O=Object(i.useState)(!1),f=Object(c.a)(O,2),g=f[0],x=f[1],y=Object(i.useRef)();console.log({canTriggerPrevStep:g,canTriggerNextStep:h});var L=Object(i.useCallback)((function(){x(!1),m(!1);var e=y.current,t=b+1;p(t),e.addEventListener("timeupdate",(function n(){e.currentTime>=e.duration-.2&&(x(t>1),m(t<Object.keys(d).length),e.removeEventListener("timeupdate",n))}))}),[b]),S=Object(i.useCallback)((function(){x(!1),m(!1);var e=y.current,t=b-1;p(t),e.addEventListener("timeupdate",(function n(){e.currentTime>=e.duration-.5&&(x(t>1),m(t<Object.keys(d).length),e.removeEventListener("timeupdate",n))}))}),[b]);return Object(r.jsxs)("div",{className:"app",children:[Object(r.jsxs)("div",{className:"tuto-container",children:[Object(r.jsx)("video",{initial:"hidden",animate:"visible",exit:"hidden",variants:l,transition:{duration:2},autoPlay:!0,autobuffer:"autobuffer",preload:"preload",className:"home_0"===n?"videotuto":"videotuto2",ref:y,src:"".concat("/monitor-tuto","/videos/").concat(n).concat(b,".mp4"),type:"video/mp4"}),Object(r.jsxs)("div",{className:"video-overlay",children:[Object(r.jsx)("h3",{initial:"hidden",animate:"visible",exit:"hidden",variants:u,transition:{duration:.5},children:d[b].title}),Object(r.jsx)("p",{initial:"hidden",animate:"visible",exit:"hidden",variants:u,transition:{duration:.5},children:d[b].desc}),Object(r.jsx)("div",{style:{flex:1}}),Object(r.jsxs)("div",{className:"btn-container",children:[Object(r.jsx)("button",{className:"button",disabled:!g,onClick:S,children:"Pr\xe9c\xe9dent"}),Object(r.jsx)("button",{className:"button",disabled:!h,onClick:L,children:"Suivant"})]})]})]}),Object(r.jsx)("button",{style:{position:"absolute",top:20,left:20},onClick:function(){o((function(e){return"Onboarding_Ecran_0"===e?"home_0":"Onboarding_Ecran_0"}))},children:"changer le mode de tuto"})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),i(e),o(e),s(e),a(e)}))};a.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(b,{})}),document.getElementById("root")),p()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.410b0a47.chunk.js.map