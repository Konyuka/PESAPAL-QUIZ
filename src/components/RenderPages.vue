<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// will be used to parse the .md file
import { marked } from 'marked';

onMounted(()=>{
    // axios to fetch the content
    axios.get(props.source)
        .then(response => {
            console.log(response.data)
            pageContent.value = marked.parse(response.data)
        });
})


const props = defineProps({
    // pass the path as prop
    source: String
});

const pageContent = ref(null);

</script>

<template>
    <div class="">
    <!-- render the .md content using the directive     -->
    <div v-html="pageContent"></div>
    </div>
</template>

<style scoped>

</style>
