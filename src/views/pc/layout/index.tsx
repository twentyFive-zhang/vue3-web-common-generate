import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Layout = defineComponent({
  name: 'PcLayout',
  setup() {
    return () => (
      <div {...{ class: 'pc-layout' }}>
        布局
        <RouterView />
      </div>
    )
  }
})

export default Layout
