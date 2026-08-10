import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {

  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
      // variant viene usato per rendere più facile l'udilizzo di condizioni ricorrenti, un'alternativa è utilizzare una costante o stato locale, ma variant è una prop nativa di framer motion
      variants={{
        hidden: 0, y: 30,
        visible: 1, y: 0
      }}
      // initial permette di settare lo stato iniziale dell'item quando viene aggiunto al dom
      initial="hidden"
      // {{
      //   opacity: 0, y: 30
      // }}
      // se initial è diverso da animate, viene questo viene usato per primo
      animate="visible"
      // {{
      //   opacity: 1, y: 0
      // }}
      // exit funziona come initial ma alla chiusura
      exit="hidden"
      // {{
      //   opacity: 0, y: 30
      // }}
      open className="modal">
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
