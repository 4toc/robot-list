<script>
import {h} from 'vue';
import findIndexWord from "../utils/findIndexWord";

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
      const findingIndex = findIndexWord(props.text, props.search.toLowerCase())
      if (props.search.length && findingIndex) {
        return [
          h('span', props.text.substring(0, findingIndex)),
          h('mark', props.text.substring(findingIndex, findingIndex + props.search.length)),
          h('span', props.text.substring(findingIndex + props.search.length)),
        ]
      } else {
        return h('span', props.text)
      }
    }
    return () => h('div', renderList())
  }
}

</script>

