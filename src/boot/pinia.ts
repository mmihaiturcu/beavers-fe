import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { useUserStore } from 'src/stores';
import { MonetizationSchemes } from 'src/types/enums';

export default boot(({ app }) => {
    app.use(createPinia());

    const savedMonetizationScheme = localStorage.getItem('monetizationScheme');

    console.log('Retrieved saved scheme', savedMonetizationScheme);

    const userStore = useUserStore();

    if (savedMonetizationScheme) {
        userStore.$patch({
            monetizationScheme: savedMonetizationScheme as MonetizationSchemes,
        });
    } else {
        userStore.$patch({
            showChooseMonetizationSchemeModal: true,
        });
    }
});
