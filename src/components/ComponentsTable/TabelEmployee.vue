<script>
import axios from '@/axios';
import ComponentUpdateEmployees from './ComponentUpdateEmployees.vue';

export default {
    name: 'TabelEmployee',
    components: {
        ComponentUpdateEmployees,
    },
    props: {
        search: '',
    },
    data() {
        return {
            employees: [],
            sortBy: 'id',
            sortOrder: 'asc',
            showUpdateEmployees: false,
            selectedEmployee: null,
            showEnd_date: false,
            id_release: null,
            end_date: '',
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
        async fetchRelease() {
            try {
                await axios.post('/api/employees-release', {
                    id: this.id_release,
                    end_date: this.formatDateToDDMMYYYY(this.end_date),
                })
                console.log('Дані успішно оновлені');
                setTimeout(() => {
                    this.$emit('saved');
                }, 1000)
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        }, 
        formatDateToDDMMYYYY(dateStr) {
            const [yyyy, mm, dd] = dateStr.split('-');
            return `${dd}.${mm}.${yyyy}`;
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
        showUpdateEmployee(employee) {
            this.selectedEmployee = employee;
            this.showUpdateEmployees = true;
            console.log('showUpdateEmployee', this.selectedEmployee);
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
    <div>
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
                    <td class="p-4 border-r border-b border-gray-600">{{ item.work_type === "Доплата" ? item.work_type +
                        ' ' + item.bonus_percent : item.work_type }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.start_date }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.invalidity?.trim() ? item.invalidity :
                        '――' }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.VBO?.trim() ? item.VBO : '――' }}</td>
                    <td class="p-4 border-r border-b border-gray-600">{{ item.ZSU?.trim() ? item.ZSU : '――' }}</td>
                    <td class="p-4 border-b border-gray-600">
                        <button
                            class="bg-[#263028] text-white w-full mb-2 rounded-full px-3 py-1 hover:bg-[#2e3d31] focus:bg-[#2e3d31] transition"
                            @click="showUpdateEmployee(item)">
                            Редагувати</button>
                        <button
                            class="bg-[#c0392b] text-white w-full rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition"
                            @click="showEnd_date = true; id_release = item.id;">Звільнений</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <ComponentUpdateEmployees v-if="showUpdateEmployees" :employee="selectedEmployee"
        @close="showUpdateEmployees = false" />


    <div v-if="showEnd_date"
        class="fixed top-0 left-0 w-full h-full bg-[#0000007c] bg-opacity-50 z-50 flex items-center justify-center">
        <div class="flex flex-col p-4 bg-[#1d1e20] rounded-3xl shadow-lg w-full max-w-4xl gap-4">
            <div class="flex justify-between">
                <h1 class="text-xl font-semibold ml-3">Звільнення</h1>
                <button class="hover:scale-115 transition" @click="showEnd_date = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex flex-col gap-4">
                <label for="Bonus" class="ps-4">Дата звільнення</label>
                <input type="date"
                    class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                    v-model="end_date">
            </div>
            <button
                class="bg-[#c0392b] text-white w-full rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition"
                @click="fetchRelease">Звільнити</button>
        </div>
    </div>
</template>