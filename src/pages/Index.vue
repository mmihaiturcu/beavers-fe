<template>
    <q-page class="row items-center justify-evenly">
        <ChooseMonetizationSchemeModal
            v-if="showChooseMonetizationSchemeModal"
            :existingMonetizationScheme="monetizationScheme"
        />
        <ImageList v-if="monetizationScheme !== MonetizationSchemes.UNSPECIFIED" />
        <q-page-sticky position="left" :offset="[20, 20]">
            <div
                id="left-ad-slot"
                :ref="
                    (el) => {
                        if (el) {
                            leftAdSlotRef = el as Element;
                        }
                    }
                "
                :style="{
                    display: monetizationScheme === MonetizationSchemes.ADS ? undefined : 'none',
                }"
            ></div>
        </q-page-sticky>
        <q-page-sticky position="right" :offset="[20, 20]">
            <div
                id="right-ad-slot"
                :ref="
                    (el) => {
                        if (el) {
                            rightAdSlotRef = el as Element;
                        }
                    }
                "
                :style="{
                    display: monetizationScheme === MonetizationSchemes.ADS ? undefined : 'none',
                }"
            ></div>
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                fab
                icon="mdi-shield-edit"
                color="primary"
                @click="showChooseMonetizationSchemeModal = true"
            />
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ImageList from 'src/components/ImageList.vue';
import { useUserStore } from 'src/stores';
import { storeToRefs } from 'pinia';
import ChooseMonetizationSchemeModal from 'src/components/ChooseMonetizationSchemeModal.vue';
import { MonetizationSchemes } from 'src/types/enums';
import { BreadwinnerModule } from 'breadwinner';

export default defineComponent({
    name: 'Index',
    components: { ImageList, ChooseMonetizationSchemeModal },
    setup() {
        const userStore = useUserStore();
        const { showChooseMonetizationSchemeModal, monetizationScheme } = storeToRefs(userStore);
        const leftAdSlotRef = ref<Element | null>(null);
        const rightAdSlotRef = ref<Element | null>(null);

        return {
            showChooseMonetizationSchemeModal,
            monetizationScheme,
            MonetizationSchemes,
            leftAdSlotRef,
            rightAdSlotRef,
        };
    },
    watch: {
        monetizationScheme: {
            handler(newValue: MonetizationSchemes, oldValue: MonetizationSchemes) {
                switch (oldValue) {
                    case MonetizationSchemes.FHE: {
                        BreadwinnerModule.disconnect();
                        break;
                    }
                }

                switch (newValue) {
                    case MonetizationSchemes.FHE: {
                        BreadwinnerModule.init(process.env.BREADWINNER_API_KEY);
                        break;
                    }
                    case MonetizationSchemes.ADS: {
                        googletag.cmd.push(() => {
                            if (this.leftAdSlotRef && this.rightAdSlotRef) {
                                googletag.display(this.leftAdSlotRef);
                                googletag.display(this.rightAdSlotRef);
                            }
                        });
                        break;
                    }
                }
            },
            immediate: true,
        },
    },
});
</script>
