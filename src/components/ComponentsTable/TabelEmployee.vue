<script>
export default{
    name: 'TabelEmployee'
}
</script>

<template>
    <table class="w-full bg-[#1d1e20] text-white rounded-3xl shadow-lg">
        <thead>
            <tr class="border-b border-gray-600">
                <th class="p-4">ІД</th>
                <th class="p-4">ПІБ</th>
                <th class="p-4">Посада</th>
                <th class="p-4">Дата прийому</th>
                <th class="p-4">Інвалідність</th>
                <th class="p-4">ВПО</th>
                <th class="p-4">Дії</th>
            </tr>
        </thead>
        <tbody>
            <tr class="hover:bg-[#2d3036] text-center transition">
                <td class="p-4">1</td>
                <td class="p-4">Іванов Іван Іванович</td>
                <td class="p-4">Менеджер</td>
                <td class="p-4">01.01.2020</td>
                <td class="p-4">--</td>
                <td class="p-4">--</td>
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