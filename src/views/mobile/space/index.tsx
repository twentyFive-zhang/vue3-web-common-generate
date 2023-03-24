import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Space = defineComponent({
  name: 'MobileSpace',
  setup() {
    return () => <div {...{ class: 'mobile-space' }}>个人空间</div>
  }
})

export default Space
