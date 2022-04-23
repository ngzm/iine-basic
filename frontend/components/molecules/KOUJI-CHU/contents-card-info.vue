<template>
  <div class="contents-card-info">
    <!-- header -->
    <div v-if="$slots.header" class="contents-card-info__header">
      <slot name="header" />
    </div>

    <!-- content -->
    <div
      class="contents-card-info__content"
      :class="{ 'flex-direction-right': direction !== 'left' }"
    >
      <div
        :style="{ 'background-image': `url(${headerImage})` }"
        class="contents-card-info__content--image"
      />
      <div class="contents-card-info__content--body">
        <div class="body-text">
          <slot />
        </div>
      </div>
    </div>

    <!-- footer -->
    <div v-if="$slots.footer" class="contents-card-info__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsCardSide',
  props: {
    headerImage: {
      type: String,
      default: '' 
    },
    direction: {
      type: String,
      default: 'left'
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  color: dimgray;
  background-color: white;
  width: 90%;
  border-radius: 12px;
  overflow: hidden;
  &__header {
    margin: 0 auto;
    padding: 0;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    &--image {
      width: 10rem;
      height: 10rem;
      background-position: center center;
      background-size: cover;
      border-radius: 50%;
      overflow: hidden;
    }
    &--body {
      margin: 0 1rem;
      .body-text {
        max-width: 54rem;
      }
    }
    &__footer {
      margin: 0 auto;
    }
  }
}

.flex-direction-right {
  flex-direction: row-reverse;
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .contents-card-info {
    width: 100%;
    border-radius: 0;
    &__content {
      &--image{
        min-width: 8rem;
        width: 8rem;
        height: 8rem;
      }
    }
  }
}
</style>
