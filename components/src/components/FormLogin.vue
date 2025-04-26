<template>
    <div class="flex justify-center items-center h-screen">
        <form class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <div class="mb-4">
                <label 
                    for="client" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Cliente
                </label>
                <input
                    type="client"
                    id="client"
                    name="client"
                    required
                    placeholder="Ingrese nombre del cliente"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-4">
                <label 
                    for="password" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Ingrese contraseña"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-[#F2564F] text-white py-3  font-semibold hover:bg-green-600 transition"
            >
                Iniciar sesión
            </button>
        </form>
    </div>
    
</template>