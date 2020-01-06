import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({ onClick, tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr
            key={`${tr}+${i}`}
            rowIndex={i}
            rowData={tableData[i]}
            dispatch={dispatch}
          /> // i가 몇번째 줄인지 나타낸다
        ))}
    </table>
  );
});

export default Table;
