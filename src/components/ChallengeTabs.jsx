import Badge from './Badge.jsx';
import { motion } from 'framer-motion';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        {/* la key segnala che ogni volta che cambia il valore il componente viene distrutto e ricreato, resettando anche tutte le animazioni e le prop collegate */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/* layoutId fa si che ogni volta che si renderizza un altro elemento con lo stesso layoutId di applicare un'animazione fluida a tale elemento */}
      {isSelected && <motion.div 
      layoutId='tab-indicator'
      className="active-tab-indicator" />}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
