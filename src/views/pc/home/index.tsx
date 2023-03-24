import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Home = defineComponent({
  name: 'PcHome',
  setup() {
    return () => <div {...{ class: 'pc-home' }}>首页</div>
  }
})

export default Home
