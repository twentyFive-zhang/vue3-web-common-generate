import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Layout = defineComponent({
  name: 'MobileLayout',
  setup() {
    return () => (
      <div {...{ class: 'mobile-layout' }}>
        布局
        <RouterView />
      </div>
    )
  }
})

export default Layout
