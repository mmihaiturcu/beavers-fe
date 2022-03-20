<template>
    <q-page class="row items-center justify-evenly">
        <ImageList />
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ImageList from 'src/components/ImageList.vue';

export default defineComponent({
    name: 'Index',
    components: { ImageList },
});
</script>
