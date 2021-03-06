import api from './../data/api.js';
import loadingAnimation from './../modules/loading-animation.js';

export default {
  data() {
    return {
      isErr: false,
      loadingStatus: false,
      clearStr: ''
    }
  },
  props: ['product', 'methodStatus'],
  emits: ['hideModal', 'updateProduct'],
  methods: {
    uploadImg(e, status) {
      const imgFile = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', imgFile);

      this.loadingStatus = true;
      axios.post(`${api.baseUrl}/${api.uploadImg_path}`, formData)
        .then(res => {
          const imgUrl = res.data.imageUrl;

          switch (status) {
            case 'mainImg':
              this.product.imageUrl = imgUrl;
              break;
            case 'otherImg':
              if (!this.product.imagesUrl) {
                this.product.imagesUrl = [];
                this.product.imagesUrl.push(imgUrl);
              } else {
                this.product.imagesUrl.push(imgUrl);
              };
              break;
          };
        }).catch(err => {
          console.dir(err);
        }).then(() => {
          this.clearStr = '';
          this.loadingStatus = false;
        });
    },
    updateProduct() {
      let method = '';
      let url = '';

      switch (this.methodStatus) {
        case 'add':
          method = 'post';
          url = `${api.baseUrl}/${api.updateProduct_path}`;
          break;
        case 'edit':
          method = 'put';
          url = `${api.baseUrl}/${api.updateProduct_path}/${this.product.id}`;
          break;
      };

      this.loadingStatus = true;
      axios[method](url, { data: this.product })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit('hideModal');
          this.$emit('updateProduct');
        }).catch(err => {
          console.dir(err);
          Swal.fire({
            icon: 'error',
            title: err.data.message,
            showConfirmButton: false,
            timer: 2000
          });
        }).then(() => {
          this.loadingStatus = false;
        });
    }
  },
  components: {
    loadingAnimation
  },
  template: `
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>????????????</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-4">
              <h6>??????????????????</h6>
                <div class="mb-2">
                  <input type="file" class="form-control" id="imgFile" :value="clearStr" placeholder="?????????????????????????????????"
                  @change="uploadImg($event, 'mainImg')" />
                </div>
                <div v-show="product.imageUrl">
                  <input type="text" class="form-control mb-1" aria-label="?????????????????????" :value="product.imageUrl" readonly> 
                  <img class="img-fluid" :src="product.imageUrl" alt="???????????????">
                </div>
              </div>

              <div class="mb-3">
                <h6>??????????????????</h6>
                <input type="file" class="form-control" id="imgFile" placeholder="?????????????????????????????????"
                :value="clearStr" @change="uploadImg($event, 'otherImg')" />
              </div>
              <div class="mb-3" v-if="product.imagesUrl?.length">
                <div class="input-group mb-1" v-for="(image, i) in product.imagesUrl" :key="image">
                  <input type="text" class="form-control" aria-label="?????????????????????" :value="image"
                  aria-describedby="button-deleteImgUrl" readonly>
                  <button class="btn btn-danger" type="button" id="button-deleteImgUrl" @click="product.imagesUrl.splice(i, 1)">??????</button>
                </div>
              </div>
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">??????</label>
                <input id="title" type="text" class="form-control" placeholder="???????????????" v-model="product.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">??????</label>
                  <input id="category" type="text" class="form-control" placeholder="???????????????" v-model="product.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">??????</label>
                  <input id="unit" type="text" class="form-control" placeholder="???????????????" v-model="product.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">??????</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="???????????????" v-model="product.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">??????</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="???????????????" v-model="product.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">????????????</label>
                <textarea id="description" type="text" class="form-control" placeholder="?????????????????????" v-model="product.description">
                  </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">????????????</label>
                <textarea id="description" type="text" class="form-control" placeholder="?????????????????????"
                  v-model="product.content"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label" for="product-status">????????????</label>
                <select class="form-select" id="product-status" aria-label="Product Status" v-model="product.status">
                  <option value="0" disabled selected>?????????????????????</option>
                  <option value="1">?????????</option>
                  <option value="2">?????????</option>
                  <option value="3">??????</option>
                  <option value="4">??????</option>
                </select>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="product.is_enabled">
                  <label class="form-check-label" for="is_enabled">????????????</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">??????</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">??????</button>
        </div>
      </div>
    </div>
    <loading-animation :loading-status="loadingStatus"></loading-animation>
  `
};