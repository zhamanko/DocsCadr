<script>
import axios from '@/axios';

export default {
    props: {
        search: '',
    },
    data() {
        return {

        }
    },
    methods: {

    },
    watch: {
        search: {
            handler() {

            }
        }
    },
    mounted() {
    }
}
</script>

<template>
    <table class="w-full">
        <thead>
            <tr class="border-b border-gray-600">
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="">ІД</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="">Назва позиція</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="">Група</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="">Підгрупа</th>
                <th class="p-4 cursor-pointer border-r border-gray-600" @click="">Ставки</th>
                <th class="p-4">Дії</th>
            </tr>
        </thead>
        <tbody>
            <tr class="hover:bg-[#2d3036] text-center transition">
                <td class="p-4 border-r border-b border-gray-600"></td>
                <td class="p-4 border-r border-b border-gray-600"></td>
                <td class="p-4 border-r border-b border-gray-600"></td>
                <td class="p-4 border-r border-b border-gray-600"></td>
                <td class="p-4 border-r border-b border-gray-600"></td>
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