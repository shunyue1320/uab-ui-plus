import { h, defineComponent } from 'vue';

const Button = defineComponent({
  name: 'Button',
  setup (props) {
    return {
      ...props
    }
  },
  render () {
    const { $slots } = this
    return (
      <button>{$slots}</button>
    )
  }
})

export default Button;