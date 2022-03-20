<template>
    <div class="image-list-container q-pa-md">
        <q-infinite-scroll @load="onLoad" :offset="250">
            <div class="image-list row align-center justify-center">
                <q-img v-for="imgURL in imageURLs" :key="imgURL" :src="imgURL" />
            </div>
        </q-infinite-scroll>
    </div>
</template>

<script lang="ts">
import { getRandomImage } from 'src/service/service';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ImageList',
    setup() {
        return {
            imageURLs: ref<string[]>([]),
        };
    },
    methods: {
        async onLoad(index: number, done: () => void) {
            this.imageURLs.push((await getRandomImage()).data);
            done();
        },
    },
});
</script>

<style scoped lang="scss">
.image-list-container {
    height: 100%;
    width: clamp(200px, 50%, 1000px);

    .image-list {
        gap: $spacing-lg;
    }
}
</style>
