import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Detail = defineComponent({
  name: 'MobileDetail',
  setup() {
    return () => <div {...{ class: 'mobile-detail' }}>帖子详情</div>
  }
})

export default Detail
