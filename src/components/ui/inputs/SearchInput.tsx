import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';

import styles from './SearchInput.module.scss';

interface Props {
  searchText: string;
  searchInputTitle?: string;
}

const SearchInput: NextPage<Props> = ({ searchText, searchInputTitle }) => {
  return (
    <div className={styles.search}>
      <input
        title={searchInputTitle ?? 'Search'}
        className={styles.searchInput}
        placeholder={searchText}
      />
      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 14, color: 'fff' }} />
      </span>
    </div>
  );
};

export default SearchInput;
