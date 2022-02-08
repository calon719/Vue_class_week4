export default {
  props: ['loadingStatus'],
  template: `<div class="d-flex justify-content-center align-items-center bg-dark bg-opacity-75
    position-absolute top-0 bottom-0 start-0 end-0 z-index-2000" v-if="loadingStatus">
      <div class="lds-dual-ring"></div>
    </div>`
};