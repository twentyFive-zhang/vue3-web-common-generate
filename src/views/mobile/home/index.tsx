import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Home = defineComponent({
  name: 'MobileHome',
  setup() {
    return () => <div {...{ class: 'mobile-home' }}>首页</div>
  }
})

export default Home
