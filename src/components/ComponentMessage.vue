<script>
export default {
    name: 'ComponentMessage',
    data() {
        return {
            isVisible: false,
        };
    },
    props: {
        message: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Повідомлення'
        },
        duration: {
            type:Number,
            default: 5000
        },
        onClose: Function
    },
    mounted() {
        this.isVisible = true;
        setTimeout(() => {
            this.hideMessage();
        }, this.duration);
    },
    methods: {
        hideMessage() {
            this.isVisible = false;
            setTimeout(() => {
                if (this.onClose) this.onClose();
            }, 500)
        }
    },
};
</script>

<template>
    <transition name="fade">
        <div v-if="isVisible"
            class="fixed bottom-3 text-center text-lg z-50 left-1/2 right-1/2 bg-[#1a1a1a] text-white p-4 rounded-3xl shadow-lg w-1/2 transform -translate-x-1/2">
            <button class="absolute top-3 right-3 text-white hover:scale-115 cursor-pointer" @click="hideMessage"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <h1>{{ title }}</h1>
            <p>{{ message }}</p>
        </div>
    </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>