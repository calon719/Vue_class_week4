import api from "./../data/api.js";
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
import productModal from './../modules/productModal.js';
import delproductModal from "./../modules/delProductModal.js";
import pagination from "./../modules/pagination.js";
import loadingAnimation from './../modules/loading-animation.js';

let productModalDOM = '';
let delProductModalDOM = '';

const app = createApp({
  data() {
    return {
      productsData: [],
      modalTemp: {
        imagesUrl: [],
        status: 0,
        is_enabled: 0
      },
      productStatus: {
        1: {
          text: '已上架',
          className: 'text-success'
        },
        2: {
          text: '未上架',
          className: 'text-dark'
        },
        3: {
          text: '缺貨',
          className: 'text-danger'
        },
        4: {
          text: '停售',
          className: 'text-muted'
        },
      },
      methodStatus: '',
      loadingStatus: false,
    }
  },
  methods: {
    // 預設第 1 頁 & 防止在第 1 頁以外的頁面做修改產品跑頁
    getProductsData(page = this.productsData?.pagination?.current_page || 1) {
      axios.get(`${api.baseUrl}/${api.getProduct_path}?page=${page}`)
        .then(res => {
          this.productsData = res.data;
        }).catch(err => {
          console.dir(err);
          alert(err.data.message);
          location.href = './index.html';
        }).then(() => {
          this.loadingStatus = false;
        });
    },
    showModal(status, product) {
      this.methodStatus = status;

      switch (status) {
        case 'add':
          this.modalTemp = {
            imagesUrl: [],
            status: 0,
            is_enabled: 0
          };
          productModalDOM.show();
          break;
        case 'edit':
          this.modalTemp = JSON.parse(JSON.stringify(product));
          productModalDOM.show();
          break;
        case 'delete':
          this.modalTemp = product;
          delProductModalDOM.show();
          break;
      };
    },
    hideModal() {
      productModalDOM.hide();
      delProductModalDOM.hide();
    }
  },
  components: {
    loadingAnimation,
    productModal,
    delproductModal,
    pagination
  },
  mounted() {
    productModalDOM = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModalDOM = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)noodleShopToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.loadingStatus = true;
    this.getProductsData();
  }
});

app.mount('#app');