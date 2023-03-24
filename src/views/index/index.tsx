import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.less'

const Index = defineComponent({
  name: 'undefinedIndex',
  setup() {
    return () => <div {...{ class: 'undefined-index' }}>index</div>
  }
})

export default Index
