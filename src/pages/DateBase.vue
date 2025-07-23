<script>
import ComponentAddEmployees from '@/components/ComponentsTable/ComponentAddEmployees.vue';

import Employees from '@/components/ComponentsTable/TabelEmployee.vue';
import Jurnals from '@/components/ComponentsTable/TabelJurnals.vue';
import Positions from '@/components/ComponentsTable/TabelPositions.vue';

export default {
    name: 'DateBase',
    components: {
        Employees,
        Jurnals,
        Positions,
        ComponentAddEmployees
    },
    data() {
        return {
            search: '',
            nameTable: 'empoyees',
            showAddEmployees: false
        }
    },
    methods:{
        onEmployeeSaved(){
            this.employeeKey++;    
            this.showAddEmployees = false;
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4 text-lg">

        <div class="flex w-full gap-4">
            <div class="bg-[#1d1e20] flex-1 h-16  flex items-center justify-center shadow-lg rounded-3xl">
                <h1>База даних</h1>
            </div>
            <div class="bg-[#1d1e20] h-16 w-1/5 px-6 flex items-center justify-center shadow-lg rounded-3xl">
                <select v-model="nameTable" @change="showAddEmployees = false"
                    class="bg-[#23262b] text-white rounded-3xl py-2 px-3 w-full hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                    <option value="empoyees">Працівники</option>
                    <option value="jurnals">Журнал</option>
                    <option value="positions">Посади</option>
                </select>
            </div>
        </div>

        <div class="bg-[#1d1e20] flex gap-2 h-22 p-4 shadow-2xl rounded-3xl">
            <input type="text" v-model="search"
                class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition"
                placeholder="Пошук">

            <div v-if="nameTable === 'empoyees'" class="flex justify-end m-2">
                <button v-if="!showAddEmployees" @click="showAddEmployees = true" class="hover:scale-115 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </button>
                <button v-else @click="showAddEmployees = false" class="hover:scale-115 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="w-full bg-[#1d1e20] text-white rounded-3xl shadow-lg pb-6">
            <ComponentAddEmployees v-if="showAddEmployees && nameTable === 'empoyees'" @saved="onEmployeeSaved" />

            <Employees v-else-if="nameTable === 'empoyees'" :search="search" :key="employeeKey" />

            <Jurnals v-else-if="nameTable === 'jurnals'" />
            <Positions v-else />
        </div>
    </div>
</template>
