<template>
    <q-dialog v-model="showChooseMonetizationSchemeModal" persistent>
        <q-card class="choose-monetization-scheme-card">
            <q-card-section class="row items-center justify-center">
                <q-item-label overline class="q-ma-sm scheme-label text-uppercase text-bold">
                    Preferred monetization scheme
                </q-item-label>
                <q-btn-toggle
                    push
                    toggle-color="primary"
                    v-model="chosenMonetizationScheme"
                    :options="monetizationSchemeOptions"
                />
            </q-card-section>

            <q-card-section class="row items-center justify-center">
                <q-item-label class="text-bold text-primary">
                    {{ descriptions[chosenMonetizationScheme] }}
                </q-item-label>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn
                    icon="mdi-check"
                    label="I consent"
                    color="primary"
                    :disable="chosenMonetizationScheme === MonetizationSchemes.UNSPECIFIED"
                    @click="chooseMonetizationScheme"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useUserStore } from 'src/stores';
import { storeToRefs } from 'pinia';
import { MonetizationSchemes } from 'src/types/enums';
import { RadioOption } from 'src/types/models';

export default defineComponent({
    name: 'ChooseMonetizationSchemeModal',
    props: {
        existingMonetizationScheme: {
            type: String as PropType<MonetizationSchemes>,
            required: true,
        },
    },
    setup(props) {
        const userStore = useUserStore();
        const { showChooseMonetizationSchemeModal } = storeToRefs(userStore);
        const chosenMonetizationScheme = ref(props.existingMonetizationScheme);
        return {
            showChooseMonetizationSchemeModal,
            chosenMonetizationScheme,
            MonetizationSchemes,
            userStore,
        };
    },
    computed: {
        monetizationSchemeOptions(): RadioOption[] {
            return [
                {
                    label: 'Ads',
                    icon: 'mdi-television-classic',
                    value: MonetizationSchemes.ADS,
                },
                {
                    label: 'Data processing',
                    icon: 'mdi-cog',
                    value: MonetizationSchemes.FHE,
                },
            ];
        },
        descriptions(): Record<MonetizationSchemes, string> {
            return {
                [MonetizationSchemes.ADS]: 'You will receive conventional ads.',
                [MonetizationSchemes.FHE]:
                    'Your computer will process small chunks of data from time to time.',
                [MonetizationSchemes.UNSPECIFIED]:
                    'Please consent to a monetization scheme to continue.',
            };
        },
    },
    methods: {
        chooseMonetizationScheme() {
            localStorage.setItem('monetizationScheme', this.chosenMonetizationScheme);
            this.userStore.$patch({
                monetizationScheme: this.chosenMonetizationScheme,
                showChooseMonetizationSchemeModal: false,
            });
        },
    },
});
</script>

<style scoped lang="scss">
.choose-monetization-scheme-card {
    min-width: 200px;
}
</style>
