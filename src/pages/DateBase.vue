<script>
import Employees from '@/components/ComponentsTable/TabelEmployee.vue';

export default{
    name: 'DateBase',
    components: {
        Employees
    },
    data() {
        return {
            search: '',
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4 text-lg">
        
        <div class ="flex w-full gap-4">
            <div class="bg-[#1d1e20] flex-1 h-16  flex items-center justify-center shadow-lg rounded-3xl">
                <h1>База даних</h1>
            </div>
            <div class="bg-[#1d1e20] h-16 w-1/5 px-6 flex items-center justify-center shadow-lg rounded-3xl">
                <select name="" id="" class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                    <option value="">Працівники</option>
                    <option value="">Журнал</option>
                    <option value="">Посади</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] flex gap-2 p-4 shadow-2xl rounded-3xl">  
            <input type="text" v-model="search" class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" placeholder="Пошук">
            <select name="" id="" class="bg-[#23262b] text-white rounded-3xl w-1/5 py-2 px-3 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                <option value="">Всі</option>
                <option value="">Вільні посади</option>
            </select>
        </div>

        <div class="w-full bg-[#1d1e20] text-white rounded-3xl shadow-lg pb-6">
            <Employees :search="this.search"/>
        </div>
    </div>
</template>
