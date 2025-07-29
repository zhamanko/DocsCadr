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

            type: this.$route.query.type,
            name: this.$route.query.name,
            addition: this.$route.query.addition,
            filePath: this.$route.query.file
        };
    },
    methods: {
        onFileSelected(file) {
            this.file = file;
            this.fileName = file.name;
        }
    },
    created() {
        console.log('Type:', this.type);
        console.log('Name:', this.name);
        console.log('Addition:', this.addition);
        console.log('File Path:', this.filePath);
    }
};
</script>
<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4">
            <h1 class="text-3xl font-bold text-center mb-4">Перевірка шаблону</h1>
            <div>
                <ComponentUploadFile @file-selected="onFileSelected" />
            </div>
        </div>
        <ComponentChangeTemplate :file="this.file" />
    </div>
</template>