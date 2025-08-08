<script>
import axios from '@/axios';

export default {
    props: {
        search: '',
    },
    data() {
        return {
            sortBy: 'id',
            sortOrder: 'asc',
            positions: [],
            editItem: null, 
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('/api/positions', {
                    params: {
                        search: this.search,
                        sort_by: this.sortBy,
                        sort_order: this.sortOrder,
                    },
                })
                this.positions = response.data;
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        },
        changeSort(field) {
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc';
            }
            this.fetchData();
        },
        openEdit(position) {
            this.editItem = { ...position };
        },
        async saveEdit() {
            if (!this.editItem) return;
            try {
                await axios.put(`/api/positions/${this.editItem.id}`, this.editItem);
                this.editItem = null;
                this.fetchData();
            } catch (error) {
                console.error('Помилка при збереженні:', error);
            }
        },
        cancelEdit() {
            this.editItem = null;
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
    <table class="w-full">
        <thead>
            <tr class="border-b border-gray-600">
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('id')">ІД</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('position')">Назва позиція</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('section')">Група</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('unit')">Підгрупа</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('rate_totale')">Ставки</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('free_rate')">Вільні ставки</th>
                <th class="p-4">Дії</th>
            </tr>
        </thead>
        <tbody>
            <tr class="hover:bg-[#2d3036] text-center transition" v-for="position in positions" :key="position.id">
                <td class="p-4 border-r border-b border-gray-600">{{ position.id }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.position }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.section }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.unit || 'N/A' }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.rate_totale }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.free_rate }}</td>
                <td class="p-4 border-b border-gray-600">
                    <button
                        class="bg-[#263028] text-white w-full mb-2 rounded-full px-3 py-1 hover:bg-[#2e3d31] transition"
                        @click="openEdit(position)">Редагувати</button>
                </td>
            </tr>
        </tbody>
    </table>

    <div v-if="editItem" class="fixed inset-0 bg-[#0000007c] flex items-center justify-center">
        <div class="bg-[#1e1f23] p-6 rounded-2xl w-3/5 shadow-3xl">
            <h2 class="text-lg font-bold mb-4">Редагування позиції</h2>
            
            <label class="block mb-2">Назва</label>
            <input v-model="editItem.position" class="bg-[#23262b] w-full mb-4 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">

            <label class="block mb-2">Група</label>
            <input v-model="editItem.section" class="bg-[#23262b] w-full mb-4 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">

            <label class="block mb-2">Підгрупа</label>
            <input v-model="editItem.unit" class="bg-[#23262b] w-full mb-4 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">

            <label class="block mb-2">Ставки</label>
            <input type="number" v-model="editItem.rate_totale" class="bg-[#23262b] w-full mb-4 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">

            <label class="block mb-2">Вільні ставки</label>
            <input type="number" v-model="editItem.free_rate" class="bg-[#23262b] w-full mb-4 px-4 text-white rounded-3xl py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">

            <div class="flex justify-end gap-2">
                <button class="bg-gray-500 px-4 py-2 rounded-3xl hover:bg-gray-600" @click="cancelEdit">Скасувати</button>
                <button class="bg-green-600 px-4 py-2 rounded-3xl hover:bg-green-700" @click="saveEdit">Зберегти</button>
            </div>
        </div>
    </div>
</template>
