<script>
import axios from '@/axios';

export default {
    data() {
        return {
            search: '',
            templates: [],
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('/api/templates', {
                    params: {
                        search: this.search,
                    },
                })
                this.templates = response.data
                console.log(response.data);
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        }
    },
    watch: {
        search: {
            handler() {
                this.fetchData();
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] mb-4 p-4 rounded-2xl ">
            <h1 class="text-3xl font-bold mb-4 text-center">Шаблони</h1>
            <div class="flex gap-4 justify-between items-center">
                <select name="type" id=""
                    class="bg-[#23262b] min-w-36 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="" v-for="template in templates" :key="template.id">{{ template.type }}</option>
                </select>
                <input type="text" placeholder="Пошук шаблону" v-model="search"
                    class="bg-[#23262b] flex-1 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-102 transition text-white p-2 rounded-2xl" />
                <select name="additional" id=""
                    class="bg-[#23262b] min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="">додаткове</option>
                    <option value="" v-for="template in templates" :key="template.id">{{ template.addition }}</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] p-4 rounded-lg">
            <ul class="flex flex-col gap-4">
                <li class="bg-[#23262b] min-w-58 text-center hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl"
                    v-for="template in templates" :key="template.id">
                    {{ template.type }} {{ template.name }} {{ template.addition }}</li>
            </ul>
        </div>
    </div>
</template>