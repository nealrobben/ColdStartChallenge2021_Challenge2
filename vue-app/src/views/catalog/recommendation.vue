<script>
import { mapGetters, mapActions } from 'vuex';
import CardContent from '@/components/card-content.vue';
import ListHeader from '@/components/list-header.vue';
//import { recEventId, recIcecreamId } from '@/store/modules/variables.js'

export default {
  name: 'CardRecommendation',
  data() {
    return {
      routePath: 'catalog',
      title: 'Recommended Ice Cream',
      errorMessage: undefined,
    };
  },
  async created() {
    await this.getRecommendation();
  },
  components: {
    CardContent,
    ListHeader,
  },
  computed: {
    ...mapGetters('catalog', { recommendation: 'recommendation' }),
    ...mapGetters('catalog', { catalog: 'catalog' }),
    recommendedIcecream() {
      if (this.catalog && this.recommendation) {
		window.recEventId = this.recommendation.eventId;
		window.recIcecreamId = this.recommendation.icecreamId
	  
        const id = Number.parseInt(this.recommendation.icecreamId, 10);
        return this.catalog.filter((c) => c.Id === id)[0];
      }
      return null;
    },
  },
  methods: {
    ...mapActions('catalog', ['getCatalogRecommendation']),
    async getRecommendation() {
      this.errorMessages = undefined;
      try {
        this.getCatalogRecommendation();
      } catch (error) {
        this.errorMessages = error.message;
      }
    },
  },
};
</script>
<template>
  <div>
    <ListHeader :title="title" @refresh="getRecommendation" :routePath="routePath" />
    <div class="column">
      <div class="card">
        <span v-if="errorMessage">{{errorMessage}}</span>
          <CardContent v-if="recommendedIcecream"
            :id="recommendedIcecream.Id"
            :name="recommendedIcecream.Name"
            :description="recommendedIcecream.Description"
            :imageurl="recommendedIcecream.ImageUrl"
          />
      </div>
    </div>
  </div>
</template>