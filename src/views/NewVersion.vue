<template>
  <div>
    <NewVersionComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import NewVersionComponent from '@/components/NewVersionComponent.vue'

export default {
  name: 'NewVersion',
  components: {
    NewVersionComponent
  }
}
</script>
