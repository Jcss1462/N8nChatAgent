// src/components/LoadingOverlay.tsx
import { useUIStore } from "../store/useUIStore";
// 1. Importamos el ícono de tres puntos
import { MoreHorizontal } from "lucide-react"; 
import { motion } from "framer-motion";

export default function LoadingOverlay() {
  const loading = useUIStore((state) => state.loading);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="flex flex-col items-center">
        {/* 2. Usamos el ícono MoreHorizontal con la animación 'pulse' */}
        <MoreHorizontal className="h-20 w-20 text-brand-light animate-pulse" />
      </div>
    </motion.div>
  );
}