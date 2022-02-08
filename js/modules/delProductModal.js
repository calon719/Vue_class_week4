import api from "./../data/api.js";

export default {
  props: ['product', 'methodStatus'],
  methods: {
    delProduct() {
      axios[this.methodStatus](`${api.baseUrl}/${api.updateProduct_path}/${this.product.id}`)
        .then(res => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 2000
          });

          this.$emit('updateProduct');
          this.$emit('hideModal');
        }).catch(err => {
          console.dir(err);
          Swal.fire({
            icon: 'error',
            title: err.data.message,
            showConfirmButton: false,
            timer: 2000
          });
        });
    }
  },
  template: `
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ product.title }}</strong> 商品
          <br />
          <strong>※刪除後將無法恢復資料</strong>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  `
};