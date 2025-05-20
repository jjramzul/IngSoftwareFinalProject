"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Inventario() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/firestore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    nombre,
                    descripcion,
                    precio: parseFloat(precio),
                    cantidad: parseInt(cantidad),
                },
            }),
        });
        setLoading(false);
        if (res.ok) {
            router.push("/inventario"); // Redirige a la página del inventario
        } else {
            alert("Error al agregar el producto al inventario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold">Agregar Nuevo Producto</h2>
            <input
                className="w-full border border-[#a0c4ff] rounded px-3 py-2"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del Producto"
                required
            />
            <textarea
                className="w-full border border-[#a0c4ff] rounded px-3 py-2"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del Producto"
            />
            <input
                type="number"
                className="w-full border border-[#a0c4ff] rounded px-3 py-2"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio"
                required
                step="0.01"
                min="0"
            />
            <input
                type="number"
                className="w-full border border-[#a0c4ff] rounded px-3 py-2"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Cantidad"
                required
                min="0"
                step="1"
            />
            <button
                type="submit"
                className="w-full py-2 rounded-full bg-[#a0c4ff] text-[#191970] font-bold shadow-sm transition hover:bg-[#8ac4ff]"
                disabled={loading}
            >
                {loading ? "Guardando..." : "Agregar al Inventario"}
            </button>
        </form>
    );
}