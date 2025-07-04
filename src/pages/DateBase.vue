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
            <input type="text" class="bg-[#23262b] flex-1 px-4 text-white rounded-3xl  py-2 placeholder:text-gray-300 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition" placeholder="Пошук">
            <select name="" id="" class="bg-[#23262b] text-white rounded-3xl w-1/5 py-2 px-3 hover:bg-[#2d3036] hover:scale-101 focus:bg-[#2d3036] focus:scale-101 transition">
                <option value="">Всі</option>
                <option value="">Вільні посади</option>
            </select>
        </div>

        <div>
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
                            <button class="bg-[#263028] text-white rounded-full px-3 py-1 hover:bg-[#2e3d31] focus:bg-[#2e3d31] transition">Редагувати</button>
                            <button class="bg-[#c0392b] text-white rounded-full px-3 py-1 hover:bg-[#e74c3c] focus:bg-[#e74c3c] transition ml-2">Видалити</button>
                        </td>
                    </tr>
                    <!-- Додайте більше рядків за потребою -->
                </tbody>
            </table>
        </div>
    </div>
</template>
