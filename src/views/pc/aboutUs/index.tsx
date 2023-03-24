import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const AboutUs = defineComponent({
  name: 'PcAboutUs',
  setup() {
    return () => <div {...{ class: 'pc-aboutUs' }}>关于我们</div>
  }
})

export default AboutUs
