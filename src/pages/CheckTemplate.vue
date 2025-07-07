<script>
import ComponentUploadFile from '@/components/ComponentUploadFile.vue';

export default {
    name: 'CheckTemplate',
    components: {
        ComponentUploadFile
    },
    data() {
        return {
            
        };
    },
    methods: {
    
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
                <ComponentUploadFile />
            </div>
        </div>
        <div class="flex flex-row gap-2">
            <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 w-1/2">
                <h2 class="text-2xl font-bold mb-4 text-center">Попередній перегляд</h2>
                <iframe src="" frameborder="0" class="w-full bg-[#dddddd] rounded-2xl"></iframe>
            </div>

            <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 w-1/2">
                <h2 class="text-2xl font-bold mb-4 text-center">Редагування значень</h2>
                <div>
                    <label for="fieldName" class="block ps-5 mb-2">Назва поля</label>
                    <input type="text" id="fieldName" class="bg-[#23262b] w-full mb-4 text-white rounded-3xl px-4 py-2 hover:bg-[#2d3036] focus:bg-[#2d3036] hover:scale-102 focus:scale-102 transition">
                </div>
                <button class="bg-[#263028] w-full text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Завантажити</button>
            </div>
        </div>
    </div>
</template>