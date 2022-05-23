import Vue from "vue";
import moment from "moment";

Vue.filter('dateFormat', (date, format = "YYYY-MM-DD HH:ii:ss") => {
    return moment(date).format(format)
})
