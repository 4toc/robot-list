<script>
import {computed, h} from 'vue';

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    search: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const renderList = () => {
      const match = props.text.match(new RegExp(props.search, 'i'))
      if (props.search.length && match) {
        return [
          h('span', props.text.substring(0, match.index)),
          h('mark', props.text.substring(match.index, match.index + props.search.length)),
          h('span', props.text.substring(match.index + props.search.length)),
        ]
      } else {
        return h('span', props.text)
      }
    }
    return () => h('div', renderList())
  }
}

</script>

