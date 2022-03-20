<template>
    <q-layout class="main-layout" view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> Beavers </q-toolbar-title>

                <div class="logo-container">
                    <q-img
                        :src="require('src/assets/beaver.svg')"
                        style="height: 50px; max-width: 60px"
                    />
                </div>

                <div>A dam fine website</div>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainLayout',
});
</script>

<style scoped lang="scss">
.main-layout {
    background-color: $background;
}

.logo-container {
    flex: 1;

    .logo {
        border-radius: 50%;
        background: $accent;
        height: 50px;
        width: 50px;
        margin-right: auto;
    }
}
</style>
