<template>
    <div class="pagination">
        <template v-for="page in pages">
            <a class="active" :key="page" v-if="page == currentPage" v-text="page"></a>
            <router-link :key="page" v-else :to="`/oferty?page=${page}`" v-text="page"></router-link>
        </template>
    </div>
</template>

<script>
export default {
    props: ["pages", "currentPage"]
};
</script>
