import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <RouterView></RouterView>
      </div>
    )
  }
})

export default App
