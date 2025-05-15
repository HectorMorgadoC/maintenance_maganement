<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-[#1D1B1C] text-[#EEE0D3] px-4">
        <div class="bg-[#4A3B34] p-10 rounded-2xl shadow-lg text-center max-w-md">
            <h1 class="text-5xl font-bold mb-4">500</h1>
            <p class="text-xl mb-6">Error interno del servidor</p>
                <p class="text-sm mb-6 opacity-80">
                    Algo salió mal en nuestro lado. Estamos trabajando para solucionarlo.
                </p>
            <router-link to="/">
                <button
                    class="bg-[#FC3B47] hover:bg-[#98B6B6] text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-300"
                >
                Volver al inicio
                </button>
            </router-link>
        </div>
    </div>
</template>

