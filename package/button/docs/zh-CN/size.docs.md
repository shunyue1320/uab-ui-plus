# 自定义颜色

这两个颜色看起来像毒蘑菇。

```html
<div>
  <n-button color="#ff69b4">#ff69b4</n-button>
  <n-button color="#8a2be2">#8a2be2</n-button>
  <cash-icon />
  <span class="n-num">num: {{ num }}</span>
</div>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup (props) {
    let num = ref(0)
    return {
      num
    }
  },
})
```

```css
.n-num {
  color: red
}
```
