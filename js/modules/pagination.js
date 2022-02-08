export default {
  props: ['pages'],
  template: `
    <nav class="d-flex justify-content-center" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled' : !pages?.has_pre}" @click.prevent="this.$emit('page', (pages.current_page - 1))">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{'active' : pages.current_page === page}" 
        v-for="page in pages?.total_pages" :key="page + '_' + pages?.total_pages">
          <a class="page-link" href="#" @click.prevent="this.$emit('page', page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !pages?.has_next}" @click.prevent="this.$emit('page', (pages.current_page + 1))">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `
};