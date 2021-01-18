import Vue from "vue";
//
Vue.filter("bgIMGStyle", val => `background-image: url('${val}')`);
//
Vue.filter("fileSizeUnits", val => {
    val = val ? val : 0;
    return `${Math.round(val / 1024, 2)}kb`;
});
//
Vue.filter("fancyDate", date => {
    const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
    const splitedDate = date.split("-");
    const month = months[splitedDate[1] - 1];
    //
    return `${splitedDate[2]} ${month} ${splitedDate[0]}`;
});
