<script>
export default {
    name: 'Home',
    data() {
        return {
            keys:
                [
                    { key: "{{ Дата наказу }}", description: "Дата створення наказу (наприклад, 15.07.2025)" },
                    { key: "{{ Номер наказу }}", description: "Офіційний номер наказу (наприклад, 123-к)" },
                    { key: "{{ Ініціали наказу }}", description: "Ініціали працівника для наказу, наприклад 'І. І. Іваненко'" },
                    { key: "{{ Повне ім'я }}", description: "Повне ім'я працівника: 'Іваненко Іван Іванович'" },
                    { key: "{{ Посада }}", description: "Назва посади працівника (наприклад, 'Артист сцени')" },
                    { key: "{{ Ініціали заяви }}", description: "Ініціали працівника у заяві, наприклад 'І. І. Іваненко'" },
                    { key: "{{ Дата заяви }}", description: "Дата написання заяви (наприклад, 14.07.2025)" }
                ],
            userKey: '{{ Мій ключ }}',
        }
    }
}
</script>

<template>
    <div class="m-4">
        <h1 class="text-3xl font-bold text-center bg-[#1d1e20] p-4 rounded-2xl mb-4 flex flex-col">Головна</h1>
        <div>
            <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 flex flex-col">
                <h2 class="text-xl font-bold text-center pb-2">Інструкція додавання шаблону</h2>
                <p class="text-gray-400">
                    📌 Для коректної роботи шаблону потрібно використовувати <span
                        class="text-white font-semibold">головні ключі</span>, які будуть автоматично замінені на
                    реальні дані при генерації документу.
                </p>
                <p class="text-gray-400">
                    🧩 Також можна додавати <span class="text-white font-semibold">власні ключі</span> у форматі <code
                        class="bg-[#2c2e32] px-1 rounded">{{ this.userKey }}</code>, які будуть заповнюватись вручну при
                    редагуванні.
                </p>
                <p class="text-gray-400">
                    🗂 <span class="text-white font-semibold">Назва шаблону</span> повинна відповідати структурі: <br>
                    <code
                        class="bg-[#2c2e32] px-2 py-1 rounded text-sm block w-fit mt-1">[Тип наказу]_[Назва наказу]_[Додатково(не обов'язково)]</code>
                    <br>
                    Наприклад: <code class="text-green-400">Наказ_Відпустка без збереження зарплати_Один день</code>
                </p>
            </div>
            <div class="bg-[#1d1e20] p-4 rounded-2xl mb-4 flex flex-col">
                <h2 class="text-xl font-bold text-center pb-2">Головні ключі</h2>
                <table>
                    <thead>
                        <tr>
                            <th class="border-gray-600 border p-2">Ключ</th>
                            <th class="border-gray-600 border p-2">Опис</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in keys" :key="index">
                            <td class="text-center border-gray-600 border p-4">{{ item.key }}</td>
                            <td class="text-center border-gray-600 border p-4">{{ item.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>