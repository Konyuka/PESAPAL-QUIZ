<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { marked } from 'marked';

onMounted(()=>{
    axios.get(props.source)
        .then(response => {
            pageContent.value = marked.parse(response.data)
        });
})

// const pageContent = computed(() => {
//     let content = null
//     axios.get(props.source)
//         .then(response => {
//             content = marked.parse(response.data)
//         });
//     return content    
// });

const props = defineProps({
    source: String
});

const pageContent = ref(null);

</script>

<template>
    <div class="">
    <div v-html="pageContent"></div>
    </div>
</template>

<style scoped>

</style>
