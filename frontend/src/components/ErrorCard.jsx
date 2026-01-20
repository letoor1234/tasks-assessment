import { motion } from "framer-motion";

const ErrorCard = ({ message }) => {
  const parseMessage = (msg) => {
    if (msg === "Network Error") {
      return "Ups! Something went wrong. Please check your internet connection and try again.";
    }
    return msg;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{parseMessage(message)}</span>
    </motion.div>
  );
};

export default ErrorCard;
