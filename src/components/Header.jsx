import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
    {/* questo è un wrapper che serve per disattivare il metodo di default di come react interpreta le animazioni */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
        // while viene usato per gestire le animazioni quando un utente interagisce con un elemento, ad esempio mouse over, click ecc..
        whileHover={{
          scale: 1.1
        }}
        transition={{type: 'spring', stiffness: 500}}
        onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
