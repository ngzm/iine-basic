<template>
  <contents-card>
    <template #default>
      <news-grid :newses="newses" />
      <div class="home-news-nav">
        <b-link href="/news">and more ...</b-link>
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, computed } from '@vue/composition-api'
import { NewsType } from '~/types/news-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import NewsGrid from '@/components/molecules/news-grid.vue'

export default defineComponent({
  name: 'NewsCatalog',
  components: { ContentsCard, NewsGrid },
  setup() {
    const title = computed(() => 'What\'s new')
    const newses = computed((): NewsType[] => {
      return [
        {
          id: 1,
          category: 'I',
          title: '当事業所のホームページを作成いたしました',
          body: `ご覧いただいておりますとおり、ロングリブネットのホームページを作成いたしました。

こちらのサイトは django という Python で作成されたサーバサイドの Web フレームワークをベースとして作成いたしました。

まだまだ取り敢えずという形で最低限の建てつけとなっておりますが、今後徐々にコンテンツを増やすとともに、必要に応じて Javascript によるアプリケーションも追加していきたいと考えております。

今後ともよろしくお願いいたします。`,
          image: 'https://longlivenet.com/media/tphotos/learn-2001940_1280.jpg',
          publishOn: new Date('2020-02-23 10:00:00'.replace(/-/g, '/')),
        },
        {
          id: 2,
          category: 'S',
          title: '初仕事で開発したサイトがリリースされました',
          body: `Long Live net として初めて頂いた仕事で開発していた Web サイト がリリースされました。
詳しいことは公表できないのですが、人材募集とかキューレーション関連のWebサービスとなります。

技術的な要素としては以下の通りです。

フロントエント: Nuxt.js, Vue.js, Element-UI, Apollo GraphQL
バックエンド: Ruby on Rails, GraphQL, MySQL, Docker
インフラ: AWS - S3, EC2, ALB, CloudFront, RDS, Elastic Beans Talk

多くの皆さんがご利用くだされば嬉しいです。`,
          image: 'https://longlivenet.com/media/tphotos/banner-995563_1920.jpg',
          publishOn: new Date('2020-04-10 01:00:00'.replace(/-/g, '/')),
        },
        {
          id: 3,
          category: 'W',
          title: '開発したWebサイトがリリースされました',
          body: `ここ数ヶ月は、海外のスタートアップ情報を紹介する Web サイト開発の仕事を頂いておりましたが、ついに10月はじめにリリースすることができました。


本開発における技術的要素は次の通りです。

フロントエント: Nuxt.js, Vue.js, Bootstrap-Vue
バックエンド: Ruby on Rails, MySQL, Docker
インフラ: AWS - S3, ECS, EC2, ALB, CloudFront, Aurora RDS

ロングリブネットとして開発したシステムとしては、2つ目のシステムととなりますが、予定通り無事にリリースできました。本当に嬉しい限りです。`,
          image: 'https://longlivenet.com/media/tphotos/startup-4045676_1280.jpg',
          publishOn: new Date('2020-10-05 00:00:00'.replace(/-/g, '/')),
        },
        {
          id: 4,
          category: 'T',
          title: 'おかげさまで一周年です！',
          body: `2021年2月10日、ロングリブネットを開業して一周年となりました。

コロナで大変な一年となりましたが、お客様にも恵まれ、何とか継続することができました。ひとえに、これまでお付き合いいただきましたお客様を始め、ご支援、ご協力いただきました多くの皆様のお陰と感謝いたしております。誠にありがとうございます。

まだしばらくはコロナの影響が継続するかと存じますが、今後は現在の開発やAWSコンサルといった業務に加え、ITエンジニア育成事業にも本格的に参画していく所存です。

まだまだこれからが勝負かと思いますが、今後も変わらぬお付き合いのほど、どうぞよろしくお願い申し上げます。`,
          image: 'https://longlivenet.com/media/tphotos/smile-5128742_1280.jpg',
          publishOn: new Date('2020-02-27 00:00:00'.replace(/-/g, '/')),
        },
        {
          id: 5,
          category: 'N',
          title: 'テストテストこれはテスト、少し長い文字列ですが',
          body: `某バンク系列の金融システムをオンプレミスからAWSクラウドに移行する案件に参画し、インフラやアプリのアーキテクチャに関する要件定義を行いました。
本格的な開発はこれからの予定ということですが、このような大きな金融機関でも AWS などクラウドを積極的に活用したいという意思を間近で感じることができ、私もますます気合が入った次第です。`,
          image: 'https://longlivenet.com/media/tphotos/technology-3406895_1280.jpg',
          publishOn: new Date('2020-02-25 00:00:00'.replace(/-/g, '/'))
        },
      ]
    })
    return {
      title,
      newses
    }
  }
})
</script>

<style lang="scss" scoped>
.home-news-nav {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
