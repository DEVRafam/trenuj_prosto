import Vue from "vue";
//
Vue.filter("bgIMGStyle", val => `background-image: url('${val}')`);
Vue.filter("fileSizeUnits", val => {
    val = val ? val : 0;
    return `${Math.round(val / 1024, 2)}kb`;
});
