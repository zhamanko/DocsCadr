<script>
import axios from '@/axios';

export default{
    name: 'TabelEmployee',
    props: {
        search: '',
    },
    data () {
        return{
            employees: [],
            sortBy: 'full_name',
            sortOrder: 'asc'
        }
    },
    methods:{
        async fetchData() {
            try{
                const response = await axios.get('/api/employees-full', {
                    params: {
                        search: this.search,
                        sort_by: this.sortBy,
                        sort_order: this.sortOrder,
                    },
                })
                this.employees = response.data
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        },
        changeSort(field){
            if(this.sortBy === field) {
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
            handler(){
                this.fetchData();
            }
        }
    },
    mounted(){
        this.fetchData();
    }
}
</script>

<template>
    <table class="w-full bg-[#1d1e20] text-white rounded-3xl shadow-lg">
        <thead>
            <tr class="border-b border-gray-600">
                <th class="p-4 cursor-pointer" @click="changeSort('id')">ІД</th>
                <th class="p-4 cursor-pointer" @click="changeSort('full_name')">ПІБ</th>
                <th class="p-4 cursor-pointer" @click="changeSort('position')">Посада</th>
                <th class="p-4 cursor-pointer" @click="changeSort('work_type')">Тип праці</th>
                <th class="p-4 cursor-pointer" @click="changeSort('start_date')">Дата прийому</th>
                <th class="p-4 cursor-pointer" @click="changeSort('invalidity')">Інвалідність</th>
                <th class="p-4 cursor-pointer" @click="changeSort('VBO')">ВПО</th>
                <th class="p-4 cursor-pointer" @click="changeSort('ZSU')">ЗСУ</th>
                <th class="p-4">Дії</th>
            </tr>
        </thead>
        <tbody>
            <tr class="hover:bg-[#2d3036] text-center transition"
            v-for="item in employees" :key="item.id">
                <td class="p-4">{{ item.id }}</td>
                <td class="p-4">{{ item.full_name }}</td>
                <td class="p-4">{{ item.position }}</td>
                <td class="p-4">{{ item.work_type }}</td>
                <td class="p-4">{{ item.start_date }}</td>
                <td class="p-4">{{ item.invalidity }}</td>
                <td class="p-4">{{ item.VBO }}</td>
                <td class="p-4">{{ item.ZSU }}</td>
                <td class="p-4 flex justify-center gap-1">
                    <button
                        class="bg-[#263028] text-white rounded-full px-3 py-1 hover:bg-[#2e3d31] focus:bg-[#2e3d31] transition">Редагувати</button>
                    <button
                        class="bg-[#c0392b] text-white rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition ml-2">Видалити</button>
                </td>
            </tr>
            <!-- Додайте більше рядків за потребою -->
        </tbody>
    </table>
</template>