<script>
import JSZip from 'jszip';
import axios from '@/axios';

export default {
    props: {
        file: {
            type: Object,
            required: false,
            validator: (value) => value instanceof File || value === null
        }
    },
    data() {
        return {
            zip: null,
            originalXml: '',
            extractedKeys: [],
            replacements: {},
            dateInputs: {},
            pdfUrl: '',
            timer: null,
        }
    },
    watch: {
        file: {
            handler(newFile, oldFile) {
                if (!newFile && !oldFile) return;
                if (newFile && oldFile && newFile.name === oldFile.name &&
                    newFile.size === oldFile.size && newFile.lastModified === oldFile.lastModified
                ) { return; }
                if (newFile) {
                    this.loadDocx(newFile);
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        async loadDocx(file) {
            if (!this.file) {
                console.log("Пусто: ", this.file);
                return;
            } else {
                console.log("Файл є!", file);
            }

            const buffer = await file.arrayBuffer();
            this.zip = await JSZip.loadAsync(buffer);

            const xml = await this.zip.file('word/document.xml').async('string');
            this.originalXml = xml;

            const matches = [...xml.matchAll(/{{(.*?)}}/g)];
            this.extractedKeys = [...new Set(matches.map(m => m[1].trim()))];

            this.replacements = {};
            this.extractedKeys.forEach(k => {
                this.replacements[k] = '';
                if (this.isDateKey(k)) {
                    this.dateInputs[k] = '';
                }
            });

        },
        async generatePdf() {
            let updatedXml = this.originalXml;

            for (const key of this.extractedKeys) {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                let value = this.replacements[key] || '';

                if (key.toLowerCase().includes('повна дата')) {
                    value = this.formatDate(value);
                }

                updatedXml = updatedXml.replace(regex, value);
            }

            this.zip.file('word/document.xml', updatedXml);
            const blob = await this.zip.generateAsync({ type: 'blob' });

            const formData = new FormData();
            formData.append('docx', blob, 'updated.docx');

            const res = await fetch('http://localhost:3000/api/generate-pdf', {
                method: 'POST',
                body: formData
            });
            const blob2 = await res.blob();
            this.pdfUrl = URL.createObjectURL(blob2);
        },
        async downloadDocx() {
            const updatedXml = this.applyReplacements();
            this.zip.file('word/document.xml', updatedXml);
            const blob = await this.zip.generateAsync({ type: 'blob' });

            const fileName = `${this.file.name} ${this.replacements['Ініціали']} ${this.replacements['Дата з']}.docx`;

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);

            const formData = new FormData();
            formData.append('file', blob, fileName);
            formData.append('number', this.replacements['Номер наказу']);
            formData.append('date', this.replacements['Дата наказу']);

            try {
                await axios.post('/api/journals', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log('Файл збережено в journalsDir і в БД');
            } catch (error) {
                console.error('Помилка збереження:', error);
            }
        },
        applyReplacements() {
            let updatedXml = this.originalXml;
            for (const key of this.extractedKeys) {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                updatedXml = updatedXml.replace(regex, this.replacements[key] || '');
            }
            return updatedXml;
        },
        onFieldChange() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.generatePdf()
            }, 500)
        },
        formatDateToDDMMYYYY(dateStr) {
            const date = new Date(dateStr);
            if (isNaN(date)) return '';
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}.${mm}.${yyyy}`;
        },
        onDateChange(key, event) {
            const isoDate = event.target.value;
            this.dateInputs[key] = isoDate;
            this.replacements[key] = this.formatDateToDDMMYYYY(isoDate);
            this.onFieldChange();
        },
        formatDate(dateString) {
            let date;

            if (!dateString) return '';

            // Якщо input типу <input type="date"> → він повертає YYYY-MM-DD
            if (dateString.includes('-')) {
                date = new Date(dateString);
            } else if (dateString.includes('.')) {
                const [day, month, year] = dateString.split('.');
                date = new Date(`${year}-${month}-${day}`);
            } else {
                date = new Date(dateString);
            }

            if (isNaN(date)) return dateString;

            let formatted = new Intl.DateTimeFormat('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date);

            return formatted.replace(/\s?р\.$/, '').trim();
        },
        isDateKey(key) {
            return /Дата|дата/i.test(key)
        }
    },
}
</script>
<template>
    <div class="flex flex-row gap-4 h-2/3">
        <div class="bg-[#1d1e20] p-4 rounded-2xl w-1/2 h-full mb-4 flex flex-col">
            <h2 class="text-2xl font-bold mb-4 text-center">Попередній перегляд</h2>
            <p v-if="file" class="text-center mb-3">Назва файлу: {{ file.name }}</p>
            <iframe v-if="pdfUrl" :src="pdfUrl" frameborder="0" class="w-full h-full bg-[#dddddd] rounded-2xl"></iframe>
            <p v-else class="text-center font-bold">PDF ще не згенерований</p>
        </div>
        <div class="w-1/2">
            <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 flex flex-col">
                <h2 class="text-2xl font-bold mb-4 text-center">Редагування значень</h2>
                <div v-for="key in extractedKeys" :key="key">
                    <label :for="key" class="block ps-5 mb-2">{{ key }}</label>
                    <input type="date" v-if="isDateKey(key)" :id="key" @input="event => onDateChange(key, event)"
                        :value="dateInputs[key]"
                        class="bg-[#23262b] w-full mb-4 text-white rounded-3xl px-4 py-2 hover:bg-[#2d3036] focus:bg-[#2d3036] hover:scale-102 focus:scale-102 transition">
                    <input type="text" v-else :id="key" v-model="replacements[key]" @input="onFieldChange"
                        class="bg-[#23262b] w-full mb-4 text-white rounded-3xl px-4 py-2 hover:bg-[#2d3036] focus:bg-[#2d3036] hover:scale-102 focus:scale-102 transition">
                </div>
                <button @click="downloadDocx"
                    class="bg-[#263028] w-full text-white rounded-3xl p-2 hover:bg-[#2e3d31] focus:bg-[#2e3d31] hover:scale-101 focus:scale-101 transition">Завантажити</button>
            </div>
        </div>
    </div>
</template>