import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import naive from 'uab-ui-plus'

const app = createApp(App)

console.log("naivenaive-----------", naive)

app.use(router)
app.use(naive)
app.mount('#app')
