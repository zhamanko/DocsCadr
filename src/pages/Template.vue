<script>
import axios from '@/axios';

export default {
    data() {
        return {
            search: '',
            templates: [],
            type: 'Тип',
            addition: 'Додаткове'
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('/api/templates', {
                    params: {
                        search: this.search,
                        type: this.type !== 'Тип' ? this.type : undefined,
                        addition: this.addition !== 'Додаткове' ? this.addition : undefined
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
        },
        type: {
            handler() {
                this.fetchData();
            }
        },
        addition: {
            handler() {
                this.fetchData();
            }
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        uniqueTypes() {
            const seen = new Set();
            return this.templates.filter(template => {
                if (!seen.has(template.type)) {
                    seen.add(template.type);
                    return true;
                }
                return false;
            });
        },
        uniqueAddition() {
            const seen = new Set();
            return this.templates.filter(template => {
                if (!seen.has(template.addition)) {
                    seen.add(template.addition);
                    return true;
                }
                return false;
            });
        }
    }
}
</script>

<template>
    <div class="p-4 text-lg">
        <div class="bg-[#1d1e20] mb-4 p-4 rounded-2xl ">
            <h1 class="text-3xl font-bold mb-4 text-center">Шаблони</h1>
            <div class="flex gap-4 justify-between items-center">
                <select name="type" v-model="type"
                    class="bg-[#23262b] min-w-36 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="Тип">Тип</option>
                    <option v-for="template in uniqueTypes" :key="template.id" :value="template.type">{{ template.type
                    }}</option>
                </select>
                <input type="text" placeholder="Пошук шаблону" v-model="search"
                    class="bg-[#23262b] flex-1 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-102 transition text-white p-2 rounded-2xl" />
                <select name="additional" v-model="addition"
                    class="bg-[#23262b] min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="Додаткове">Додаткове</option>
                    <option v-for="template in uniqueAddition" :key="template.id" :value="template.addition">{{
                        template.addition }}</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] p-4 rounded-lg">
            <ul class="flex flex-col gap-4">
                <router-link v-for="template in templates" :key="template.id"
                    :to="{ name: 'UpdateTemplate', query: { type: template.type, name: template.name, addition: template.addition, file: template.file } }"
                    class="bg-[#23262b] flex items-center justify-between min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl">
                    <p>{{ template.type }} {{ template.name }} {{ template.addition }}</p>
                    <!-- <button class="bg-[#1d1e20] p-2 rounded-2xl items-center flex hover:bg-[#1f2022] hover:border-[#5f626e] hover:border transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p class="ml-2">Видалити шаблон</p>
                    </button> -->
                </router-link>
            </ul>
        </div>
    </div>
</template>