<script>
import { mapGetters,mapActions} from 'vuex';
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import ListHeader from '@/components/list-header.vue';
import getUserInfo from '../../assets/js/userInfo';

export default {
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
  async created() {
	await this.getRecommendedIcecream();
  },
    computed: {
    ...mapGetters('catalog', { recommendation: 'recommendation' }),
    ...mapGetters('catalog', { catalog: 'catalog' }),
    icecreamRecommendation() {
		console.log('icecreamRecommendation');
      if (this.catalog && this.recommendation) {
        const icecreamid = Number.parseInt(this.recommendation.icecreamId, 10);
        return this.catalog.filter((c) => c.Id === icecreamid)[0];
      }
      return null;
    },
  },
  methods: {
    ...mapActions('catalog', ['getCatalogRecommendation']),
    async getRecommendedIcecream() {
      this.errorMessages = undefined;
      try {
		console.log('getRecommendedIcecream');
        this.getCatalogRecommendation();
      } catch (error) {
        this.errorMessages = error.message;
      }
    },
  }
};
</script>

<template>
  <div>
    <ListHeader :title="title" @refresh="getRecommendedIcecream" :routePath="routePath" />
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
