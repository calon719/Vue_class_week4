import api from './../data/api.js';
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
import loadingAnimation from './../modules/loading-animation.js';
console.log(api);

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loadingStatus: false,
      isErr: false
    }
  },
  methods: {
    login() {
      this.loadingStatus = true;
      axios.post(`${api.baseUrl}/${api.login_path}`, this.user)
        .then(res => {
          this.isErr = false;
          const { token, expired } = res.data;
          document.cookie = `noodleShopToken=${token}; expires=${new Date(expired)};`;

          location.href = "./admin-products.html";
        }).catch(() => {
          this.isErr = true;
        }).then(() => {
          this.loadingStatus = false;
        });
    },
  },
  components: {
    loadingAnimation
  }
});

app.mount('#app');