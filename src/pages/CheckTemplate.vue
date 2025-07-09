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
                <!-- <input type="file" name="templateFile" id="templateFile" class="bg-[#23262b] w-full mb-4 text-white rounded-3xl file:px-4 file:py-2 file:bg-[#1c1e20] hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" accept=".docx, .doc, .pdf">
                <button class="bg-[#263028] w-full text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Завантажити</button> -->
                <ComponentUploadFile @file-selected="onFileSelected"/>
                <p class="mt-6 mx-2">Назва файла: {{ this.fileName }}</p>
            </div>
        </div>
        <ComponentChangeTemplate :file="this.file"/>
    </div>
</template>