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
                this.positions = response.data
                console.log(response.data);
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
                <td class="p-4 border-r border-b border-gray-600">{{ position.unit ? position.unit : 'N/A' }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.rate_totale }}</td>
                <td class="p-4 border-r border-b border-gray-600">{{ position.free_rate }}</td>
                <td class="p-4 border-b border-gray-600">
                    <button
                        class="bg-[#263028] text-white w-full mb-2 rounded-full px-3 py-1 hover:bg-[#2e3d31] focus:bg-[#2e3d31] transition">Редагувати</button>
                    <button
                        class="bg-[#c0392b] text-white w-full rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition">Видалити</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>