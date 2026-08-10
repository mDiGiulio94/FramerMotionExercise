import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      // questo applica in modo imperatico le animazioni, animate in questo causo colpirà tutti gli input e textarea, applicherà la transizione di x e il resto delle proprietà ( quelle nel secondo oggetto corrispondono alla chiave transition, definita inline)
      animate(
        "input, textarea",
        {
          x: [-10, 0, 10, 0],
        },
        {
          type: "spring",
          duration: 0.2,
          delay: stagger(0.05),
        },
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          variants={{
            visible: {
              transition: {
                // staggerChildren è la proprietà per far partire un'animazione ad elementi figli, invece che tutte insieme, con un delay, il valore di staggerChildren corrisponde al delay impostato dal primo item all'ultimo
                staggerChildren: 0.05,
              },
            },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              // le prop vengono passate agli elementi figli dal padre anche, quindi se sono usate, come in questo caso modal, che riceve dei children, quei children potranno accervi, come ad esempio exit e initial, per questo qui è stato specificato l'exit, per sovrascrivere il comportamento proveniente dal padre
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                // può essere assegnato un'array per definire vari valori che l'animazione attraverserà invece che metterne uno statico, questo per dare multipli effeti
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
              }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
