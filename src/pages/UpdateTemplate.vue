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
            addition: this.$route.query.addition
        };
    },
    methods: {
        onFileSelected(file) {
            this.file = file;
            this.fileName = file.name;
        }
    },
    created() {
        const type = this.$route.query.type;
        const addition = this.$route.query.addition;
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