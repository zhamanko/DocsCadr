<script>
import axios from '@/axios';
import ComponentAddEmployees from './ComponentAddEmployees.vue';

export default {
    name: 'TabelEmployee',
    components: {
        ComponentAddEmployees,
    },
    props: {
        search: '',
    },
    data() {
        return {
            employees: [],
            sortBy: 'id',
            sortOrder: 'asc',
            showAddEmployees: false
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('/api/employees-full', {
                    params: {
                        search: this.search,
                        sort_by: this.sortBy,
                        sort_order: this.sortOrder,
                    },
                })
                this.employees = response.data
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
        },
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
    <div v-if="!showAddEmployees">
        <table class="w-full">
            <thead>
                <tr class="border-b border-gray-600">
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('id')">ІД</th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('full_name')">ПІБ</th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('position')">Посада</th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('work_type')">Тип праці
                    </th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('start_date')">Дата
                        прийому
                    </th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('invalidity')">
                        Інвалідність
                    </th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('VBO')">ВПО</th>
                    <th class="p-4 cursor-pointer border-r border-gray-600" @click="changeSort('ZSU')">ЗСУ</th>
                    <th class="p-4">Дії</th>
                </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-[#2d3036] text-center transition" v-for="item in employees" :key="item.id">
                    <td class="p-4 border-r border-b border-gray-600">{{ item.id }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.full_name }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.position }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.work_type === "Доплата" ? item.work_type + ' ' + item.bonus_percent : item.work_type }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.start_date }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.Invalidity?.trim() ? item.Invalidity : '――' }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.VBO?.trim() ? item.VBO : '――' }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.ZSU?.trim() ? item.ZSU : '――' }}</td>
                    <td class="p-4 border-b border-gray-600">
                        <button
                            class="bg-[#263028] text-white w-full mb-2 rounded-full px-3 py-1 hover:bg-[#2e3d31] focus:bg-[#2e3d31] transition">Редагувати</button>
                        <button
                            class="bg-[#c0392b] text-white w-full rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition">Звільнений</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <ComponentAddEmployees v-else/>
</template>