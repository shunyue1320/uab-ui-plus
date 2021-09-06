import { h, defineComponent } from 'vue';

const buttonProps = {
  color: String
}


const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup (props) {
    return {
      ...props
    }
  },
  render () {
    const { $slots, color } = this
    return (
      <button style={{ background: color }}>{$slots}</button>
    )
  }
})

export default Button;