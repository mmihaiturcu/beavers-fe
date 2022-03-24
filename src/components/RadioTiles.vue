<template>
    <div class="radio-group">
        <div class="radio" v-for="(item, key) in items" :key="key">
            <label class="radio-wrapper">
                <input
                    type="radio"
                    name="radioTilesGroup"
                    class="radio-input"
                    :checked="modelValue === item.value"
                    @change="$emit('update:modelValue', item.value)"
                />
                <span class="radio-tile">
                    <span class="radio-icon">
                        <q-icon class="item-icon" :name="item.icon" />
                    </span>
                    <span class="radio-label">{{ item.label }}</span>
                </span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { RadioOption } from 'src/types/models';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'RadioTiles',
    emits: ['update:modelValue'],
    props: {
        items: { required: true, type: Object as PropType<Array<RadioOption>> },
        modelValue: { required: true, type: [Number, String] as PropType<number | string> },
    },
});
</script>

<style scoped lang="scss">
$base-color: hsl(var(--mainColor-h), var(--mainColor-s), 90%);
$active-color: $primary;

.item-icon {
    width: 60px;
    filter: invert(46%) sepia(0%) saturate(0%) hue-rotate(108deg) brightness(92%) contrast(84%);
}

*,
*:after,
*:before {
    box-sizing: border-box;
}

.radio-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, 128px);
    justify-content: center;
    width: 100%;
    & > * {
        margin: 8px;
    }
    border: none;
}

.radio-group-legend {
    font-size: 24px;
    font-weight: 700;
    color: #9c9c9c;
    text-align: center;
    line-height: 1.125;
    margin-bottom: 20px;
}

.radio-input {
    // Code to hide the input
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    &:checked + .radio-tile {
        border-color: $active-color;
        box-shadow: 0 5px 10px rgba(#000, 0.1);
        color: $active-color;
        &:before {
            transform: scale(1);
            opacity: 1;
            background-color: $active-color;
            border-color: $active-color;
        }

        .radio-icon,
        .radio-label {
            color: $active-color;
        }

        .item-icon {
            fill: $active-color;
            filter: initial;
        }
    }

    &:focus + .radio-tile {
        border-color: $active-color;
        box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px $base-color;
        &:before {
            transform: scale(1);
            opacity: 1;
        }
    }
}

.radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 112px;
    min-height: 112px;
    border-radius: 8px;
    border: 2px solid $base-color;
    background-color: var(--contrastColor);
    box-shadow: 0 5px 10px rgba(#000, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        border: 2px solid $base-color;
        background-color: var(--contrastColor);
        border-radius: 50%;
        top: 4px;
        left: 4px;
        opacity: 0;
        transform: scale(0);
        transition: 0.25s ease;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    &:hover {
        border-color: $active-color;
        &:before {
            transform: scale(1);
            opacity: 1;
        }
    }
}

.radio-icon {
    transition: 0.375s ease;
    color: $active-color;
    svg {
        width: 48px;
        height: 48px;
    }
}

.radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
}
</style>
