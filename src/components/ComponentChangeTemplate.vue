<script>
import JSZip from 'jszip';

export default {
    props: {
        file: {
            type: File,
            required: false
        }
    },
    data() {
        return {
            zip: null,
            originalXml: '',
            extractedKeys: [],
            replacements: {},
            pdfUrl: '',
            timer: null
        }
    },
    watch: {
        file: {
            immediate: true,
            handler(newFile) {
                this.loadDocx(newFile)
            }
        }
    },
    methods: {
        async loadDocx(file) {
            const buffer = await file.arrayBuffer();
            this.zip = await JSZip.loadAsync(buffer);

            const xml = await this.zip.file('word/document.xml').async('string');
            this.originalXml = xml;

            const matches = [...xml.matchAll(/{{(.*?)}}/g)];
            this.extractedKeys = [...new Set(matches.map(m => m[1].trim()))];

            this.replacements = {};
            this.extractedKeys.forEach(k => this.$set(this.replacements, k, ''));
        },
        async generatePdf() {
            let updatedXml = this.originalXml;

            for (const key of this.extractedKeys) {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                updatedXml = updatedXml.replace(regex, this.replacements[key] || '');
            }

            this.zip.file('word/document.xml', updatedXml);
            const blob = await this.zip.generateAsync({ type: 'blob' });

            const formData = new FormData();
            formData.append('docx', blob, 'updated.docx');

            const res = await fetch('http://localhost:3000/api/generate-pdf', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            this.pdfUrl = `http://localhost:3000${data.url}`;
        },
        onFieldChange() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.generatePdf()
            }, 500)
        }
    }
}
</script>
<template>
    <div class="flex flex-row gap-2">
        <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-center">Попередній перегляд</h2>
            <iframe v-if="pdfUrl" :src="pdfUrl" 
            frameborder="0" class="w-full bg-[#dddddd] rounded-2xl"></iframe>
            <p v-else class="text-center font-bold">PDF ще не згенерований</p>
        </div>

        <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-center">Редагування значень</h2>
            <div v-for="key in extractedKeys" :key="key">
                <label :for="key" class="block ps-5 mb-2">{{ key }}</label>
                <input type="text" :id="key" v-model="replacements[key]" @input="onFieldChange"
                    class="bg-[#23262b] w-full mb-4 text-white rounded-3xl px-4 py-2 hover:bg-[#2d3036] focus:bg-[#2d3036] hover:scale-102 focus:scale-102 transition">
            </div>
            <button
                class="bg-[#263028] w-full text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Завантажити</button>
        </div>
    </div>
</template>