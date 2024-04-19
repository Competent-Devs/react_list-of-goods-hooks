import "bulma/css/bulma.css";
import "./App.scss";
import { useState } from "react";
import classNames from "classnames";

export const goodsFromServer = [
  "Dumplings",
  "Carrot",
  "Eggs",
  "Ice cream",
  "Apple",
  "Bread",
  "Fish",
  "Honey",
  "Jam",
  "Garlic",
];

enum SortType {
  NONE = "",
  alphabetically = "ABC",
  LENGTH = "LENGTH",
}

type SortTypeAnnotation = SortType | "";

const getPreparedGoods = (
  goods: string[],
  sortType: SortTypeAnnotation,
  isReverse: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReverse);
  const handleClickSortNone = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classNames({
            "is-light": sortType !== SortType.alphabetically,
          })}`}
          onClick={() => setSortType(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${classNames({
            "is-light": sortType !== SortType.LENGTH,
          })}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${classNames({
            "is-light": !isReverse,
          })}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickSortNone}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
