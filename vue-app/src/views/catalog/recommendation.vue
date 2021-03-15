<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import ListHeader from '@/components/list-header.vue';
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
  <div>
    <ListHeader :title="title" @refresh="" :routePath="routePath" />
    <div class="column">
      <div class="card">
        <span v-if="errorMessage">{{errorMessage}}</span>
          <CardContent v-if="icecreamRecommendation"
            :id="icecreamRecommendation.Id"
            :name="icecreamRecommendation.Name"
            :description="icecreamRecommendation.Description"
            :imageurl="icecreamRecommendation.ImageUrl"
          />
      </div>
    </div>
  </div>
</template>
