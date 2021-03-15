<script>
import { mapGetters, mapActions } from 'vuex';
import CardContent from './card-content.vue';
import ListHeader from './list-header.vue';

export default {
  name: 'IcecreamRecommendation',
  data() {
    return {
      routePath: 'catalog',
      title: 'Ice cream recommendation',
      errorMessage: undefined,
    };
  },
  //async created() {
    //await this.getRecommendedIcecream();
  //},
  components: {
    CardContent,
    ListHeader,
  },
  computed: {
    ...mapGetters('catalog', { recommendation: 'recommendation' }),
    ...mapGetters('catalog', { catalog: 'catalog' }),
    icecreamRecommendation() {
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
