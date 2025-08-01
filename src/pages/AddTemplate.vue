<script>
import ComponentUploadFile from '@/components/ComponentUploadFile.vue';

export default {
    components: {
        ComponentUploadFile,
    },
    data() {
        return {
            file: null,
            fileType: "",
            fileName: "",
            fileAddition: "",
        }
    },
    methods: {
         async submit() {
      try {
        const buffer = await this.file.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(buffer).reduce((acc, b) => acc + String.fromCharCode(b), '')
        );

        const payload = {
          type: this.fileType,
          name: this.fileName,
          addition: this.fileAddition,
          filename: this.file.name,
          fileBuffer: base64,
        };

        const res = await axios.post('/api/templates-add', payload);

        alert('✅ Шаблон збережено!');
        this.name = '';
        this.description = '';
        this.selectedType = '';
        this.file = null;
      } catch (err) {
        alert('❌ Помилка: ' + (err.response?.data || err.message));
      }
    },
        onFileSelected(file) {
            this.file = file;

            if (!this.file) { return; };

            const fileName = this.file.name;
            const withoutExt = fileName.replace(/\.[^.]+$/, "");
            const parts = withoutExt.split("_");

            this.fileType = parts[0] || "";

            if (parts.length === 2) {
                this.fileName = parts[1];
                this.fileAddition = "";
            } else {
                this.fileAddition = parts[parts.length - 1];
                this.fileName = parts.slice(1, -1).join(" ");
            }
        }
    }
}
</script>
<template>
    <div class="flex justify-center items-center text-lg">
        <div class="flex flex-col items-center bg-[#1d1e20] p-12 rounded-3xl gap-3">
            <h1 class="text-2xl font-bold">Додати шаблон</h1>
            <form action="" class="flex flex-col gap-4">
                <ComponentUploadFile @file-selected="onFileSelected" />
                <div v-if="fileType">
                    <input type="text" name="templateName" id="templateName" placeholder="Введіть назву шаблону"
                        v-model="this.fileName"
                        class="bg-[#23262b] px-4 text-white rounded-3xl py-2 w-full placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                </div>
                <div v-if="fileName">
                    <select name="templateCategory" id="templateCategory"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="category1">Тип</option>
                        <option value="category2">{{ this.fileType }}</option>
                        <option value="category3">Категорія 3</option>
                    </select>
                </div>
                <div v-if="fileAddition">
                    <select name="templateCategory" id="templateCategory2"
                        class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                        <option value="category1">{{ this.fileAddition }}</option>
                        <option value="category2">Категорія 2</option>
                        <option value="category3">Категорія 3</option>
                    </select>
                </div>
                <button v-if="fileType && fileName" type="submit"
                    class="bg-[#263028] w-full text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Додати</button>
            </form>
        </div>
    </div>
</template>