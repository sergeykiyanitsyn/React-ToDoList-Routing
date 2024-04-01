import styles from './Sorting.module.css'
import PropTypes from 'prop-types'

export const Sorting = ({ sortOn, setSortOn }) => {
  const onClickSort = () => {
    setSortOn(!sortOn)
  }

  return (
    <div className={styles.sorting}>
      <label htmlFor="sort">
        {' '}
        Сортировка по алфавиту{' '}
        <button
          className={styles.sortingButton}
          id="sort"
          type="click"
          onClick={onClickSort}
        >
          {sortOn ? 'On' : 'Off'}
        </button>
      </label>{' '}
    </div>
  )
}

Sorting.propTypes = {
  sortOn: PropTypes.bool,
  setSortOn: PropTypes.any,
}
