import { defineStore } from 'pinia';
import { MonetizationSchemes } from 'src/types/enums';

const storeID = 'user';

interface UserStoreState {
    monetizationScheme: MonetizationSchemes;
    showChooseMonetizationSchemeModal: boolean;
}

const UserStoreState: UserStoreState = {
    monetizationScheme: MonetizationSchemes.UNSPECIFIED,
    showChooseMonetizationSchemeModal: false,
};

export { UserStoreState };

export const useUserStore = defineStore({
    id: storeID,
    state: (): UserStoreState => UserStoreState,
});

export type UserStore = ReturnType<typeof useUserStore>;
