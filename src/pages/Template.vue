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
                    <option v-for="template in uniqueTypes" :key="template.id" :value="template.type">{{ template.type }}</option>
                </select>
                <input type="text" placeholder="Пошук шаблону" v-model="search"
                    class="bg-[#23262b] flex-1 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-102 transition text-white p-2 rounded-2xl" />
                <select name="additional" v-model="addition"
                    class="bg-[#23262b] min-w-58 hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-105 hover:scale-105 transition text-white p-2 rounded-2xl">
                    <option value="Додаткове">Додаткове</option>
                    <option v-for="template in uniqueAddition" :key="template.id" :value="template.addition">{{ template.addition }}</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] p-4 rounded-lg">
            <ul class="flex flex-col gap-4">
                <router-link
                v-for="template in templates" :key="template.id"
                    :to="{ name: 'UpdateTemplate', query: { type: template.type, name: template.name, addition: template.addition, file: template.file } }" 
                    class="bg-[#23262b] min-w-58 text-center hover:bg-[#2c2f33] focus:bg-[#2c2f33] focus:scale-101 hover:scale-101 transition text-white p-4 rounded-2xl">
                    {{ template.type }} {{ template.name }} {{ template.addition }}</router-link>
            </ul>
        </div>
    </div>
</template>