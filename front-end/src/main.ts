import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// Datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(store);
app.use(router);
app.use(vuetify);
app.component('Datepicker', Datepicker);

app.mount('#app');
