import styles from '../styles/Entry.module.css';
import type { SingleEntry } from '../types/InquiryTypes';

const Entry = ({ data }: SingleEntry) => {
  return (
    <tr key={data.id} className={styles.entryRow}>
      <td className={styles.entryCell}>{data.full_name}</td>
      <td className={styles.entryCell}>{data.phone_number}</td>
      <td className={styles.entryCell}>{data.gender}</td>
      <td className={styles.entryCell}>
        {new Date(data.date_of_birth).toLocaleDateString()}
      </td>
      <td className={styles.entryActions}>
        <button className={`${styles.viewButton} ${styles.actionButton}`}>View</button>
      </td>
      <td className={styles.entryActions}>
        <button className={`${styles.updateButton} ${styles.actionButton}`}>Update</button>
      </td>
      <td className={styles.entryActions}>
        <button className={`${styles.deleteButton} ${styles.actionButton}`}>Delete</button>
      </td>
    </tr>
  );
};

export default Entry;
