import React, { useMemo, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) =>
          useMemo(
            () => (
              <Td
                dispatch={dispatch}
                key={`${td}+${i}`}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}
              >
                {''}
              </Td>
            ),
            [rowData[i]]
          )
        )}
    </tr>
  );
});

export default Tr;
