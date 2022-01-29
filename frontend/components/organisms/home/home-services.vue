<template>
  <section>
    <h4 class="section-title">
      <span>{{ title }}</span>
    </h4>
    <features-grid :category="category" :features-list="servicesList" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { FeatureListItem } from '~/types/feature-type'
import FeaturesGrid from '@/components/molecules/features-grid.vue'

export default defineComponent({
  name: 'HomeServices',
  components: { FeaturesGrid },
  setup() {
    const title = computed(() => 'Services')
    const category = 'service'
    const servicesList: FeatureListItem[] = [
      {
        id: 1,
        category: 'service',
        title: 'AWSクラウド導入',
        listImage: 'https://longlivenet.com/static/images/s-service-aws.jpg',
        listComment: '代表ナガズミはアマゾンウェブサービスジャパン (AWS) のエンジニアとしての経歴がございます。そのキャリアによる技術知見を元に適切なサポートをご提供いたします。'
      },
      {
        id: 2,
        category: 'service',
        title: 'ソフトウェア開発',
        listImage: 'https://longlivenet.com/static/images/s-service-system.jpg',
        listComment: 'お客様のWebアプリケーションなど各種ソフトウェア開発を行います。上流工程から下流工程まで、また、PM や PMO 業務などの開発管理につきましてもお気軽にご相談ください。'
      },
      {
        id: 3,
        category: 'service',
        title: '技術顧問',
        listImage: 'https://longlivenet.com/static/images/s-service-advisor.jpg',
        listComment: '特に AWS を前提とするシステムアーキテクチャについて、または開発や組織のマネージメント強化、あるいは技術者育成や環境整備といった内容についてご相談いただけます。'
      },
      {
        id: 4,
        category: 'service',
        title: 'ホームページ作成',
        listImage: 'https://longlivenet.com/static/images/s-service-hp.jpg',
        listComment: 'PC からスマホまでレスポンシブなデザインのホームページを作成いたします。またチャットなどインタラクティブな Web サイトの開発についてもぜひご相談ください。'
      },
      {
        id: 5,
        category: 'service',
        title: 'ITエンジニア育成',
        listImage: 'https://longlivenet.com/static/images/s-service-education.jpg',
        listComment: 'インドや中国出身のグローバルで活躍するエンジニアが増えていますが、我が国出身のエンジニアはまだまだ少ないように思えます。グローバルに活躍できるエンジニアの育成は、ロングリブネットにおける今後の大きなビジョンです。'
      },
      {
        id: 6,
        category: 'service',
        title: '各種IT相談',
        listImage: 'https://longlivenet.com/static/images/s-service-consul.jpg',
        listComment: '組織におけるビジネスシステムを設計しているが現構成で大丈夫か不安、新たなシステム責任者となったが協力会社から提案された内容が正しいのか判断つかない、このようなご相談をプロ目線にてお受けします。1時間単位でご相談いただけます。'
      },
    ]

    return {
      title,
      category,
      servicesList
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}
</style>
