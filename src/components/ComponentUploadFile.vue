<script>
import { showMessage } from '@/utils/message';

export default {
    name: 'ComponentUploadFile',
    data() {
        return {
            file: null,
            fileName: '',
            isDragging: false
        };
    },
    methods: {
        triggerInputClick() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            this.uploadFile(event);
        },
        handleDrop(event) {
            this.isDragging = false
            this.uploadFile(event);
        },
        handleDragOver(event) {
            event.preventDefault();
            this.isDragging = true;
        },
        handleDragLeave() {
            this.isDragging = false;
        },
        handleChange(event) {
            this.handleFileUpload(event);
        },
        uploadFile(event) {
            const file = (event.dataTransfer?.files?.[0]) || (event.target?.files?.[0]);
            if (!file) { return; }

            if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
                showMessage('Будь ласка, завантажте файл у форматі DOCX або DOC.');
                return;
            }

            this.file = file;
            this.fileName = file.name;
            showMessage('Документ завантажено.', 2000);
        }
    }
}
</script>

<template>
    <div @drop.prevent="handleDrop" @dragover.prevent="handleDragOver" @dragleave="handleDragLeave"
        @click="triggerInputClick" :class="[
            'flex flex-col items-center justify-center h-full p-4 cursor-pointer rounded-3xl transition duration-300',
            isDragging ? 'bg-[#2d3036] scale-102' : 'bg-[#23262b] hover:bg-[#2d3036] hover:scale-102'
        ]">
        <div
            class="flex flex-col items-center justify-center rounded-3xl w-full p-4 border-2 border-dashed border-[#white]">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-18">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
            </div>
            <p class="text-xl">Перетягніть DOCX-файл сюди або натисніть, щоб вибрати</p>
            <input type="file" ref="fileInput" @change="handleChange" accept=".docx, .doc" hidden />
        </div>
    </div>
</template>