<template>
    <div>
        <slot>{{item.value}}</slot>
    </div>
</template>

<script>
    export default {
        name: "VirtualListItem",
        props: {
            item: {
                type: Object,
                default: () => {
                }
            }
        }
    };
</script>
