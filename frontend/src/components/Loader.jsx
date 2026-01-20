import { LucideLoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 *  Loader component to indicate loading state
 * @returns JSX.Element
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <LucideLoaderCircle className="animate-spin" size={48} />
      </motion.div>
    </div>
  );
};

export default Loader;
