<script>
import ComponentUploadFile from '@/components/ComponentUploadFile.vue';
import ComponentChangeTemplate from '@/components/ComponentChangeTemplate.vue';

export default {
    name: 'CheckTemplate',
    components: {
        ComponentUploadFile,
        ComponentChangeTemplate
    },
    data() {
        return {
            file: null,
            fileName: "",
        };
    },
    methods: {
        onFileSelected(file){
            this.file = file;
            this.fileName = file.name;
        }
    }
};
</script>
<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4">
            <h1 class="text-3xl font-bold text-center mb-4">Перевірка шаблону</h1>
            <div>
                <ComponentUploadFile @file-selected="onFileSelected"/>
                <p class="mt-6 mx-2">Назва файла: {{ this.fileName }}</p>
            </div>
        </div>
        <ComponentChangeTemplate :file="this.file"/>
    </div>
</template>