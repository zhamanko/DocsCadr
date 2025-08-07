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
            addition: this.$route.query.addition || '',
            filePath: this.$route.query.file
        };
    },
    methods: {
        onFileSelected(file) {
            this.file = file;
            this.fileName = file.name;
        },
        async loadFileFromElectron() {
            try {
                const buffer = await window.electronAPI.getDocxTemplate(this.filePath); // Uint8Array or Buffer
                const blob = new Blob([new Uint8Array(buffer)], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });

                const file = new File([blob], this.type + ' ' + this.name + ' ' + this.addition, {
                    type: blob.type,
                    lastModified: Date.now()
                });

                this.file = file;
                this.fileName = file.name;
            } catch (e) {
                console.error("Не вдалося завантажити шаблон із Electron:", e);
            }
        }
    },
    created() {
        if (this.filePath) {
            this.loadFileFromElectron();
        }
    }
};
</script>
<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4">
            <h1 class="text-3xl font-bold text-center">Перевірка шаблону</h1>
            <div v-if="!filePath" class="mt-4">
                <ComponentUploadFile @file-selected="onFileSelected" />
            </div>
        </div>
        <ComponentChangeTemplate :file="this.file" />
    </div>
</template>