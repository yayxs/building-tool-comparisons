import { h, defineComponent } from 'vue'
import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline'

// element-plus icon
import Download from '@iconify-icons/ep/download'

addIcon('download', Download)

// Unicons
import Import from '@iconify-icons/uil/import'

addIcon('import', Import)

export default defineComponent({
  name: 'IconifyIconOffline',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render() {
    const attrs = this.$attrs
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
        ...attrs
      },
      {
        default: () => []
      }
    )
  }
})
