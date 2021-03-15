<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import getUserInfo from '../../assets/js/userInfo';

module.exports = {
	name: 'Recommendation',
  data() {
    return {
      routePath: 'catalog',
      title: 'Ice cream recommendation',
      errorMessage: undefined,
    };
  },
  components: {
    CardContent,
    ListHeader,
  },
};
</script>

<template>
  <p>Hello World!</p>
</template>
