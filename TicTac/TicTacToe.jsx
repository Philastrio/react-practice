import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1]
};
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        // state.winner = action.winner; 이렇게 직접 바꾸면 안된다.
        ...state,
        winner: action.winner
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 불변성을 지켜야 하기에 기존 것을 얕은 복사를 한다.
      tableData[action.row] = [
        ...tableData[action.row]
      ]; /* action.row Td.jsx에서 
      dispatchEvent({ type: CLICK_CELL, 
        row: rowIndex, 
        cell: cellIndex });의 
        row를 의미 / action.cell은 여기의 cell을 의미
        객체가 있으면 무조건 얕은 복사를 한다고 생각해야 한다 -> 이것은 immer라는 라이브러리로 가독성 문제를 해결한다
        */
      tableData[action.row][action.cell] = state.turn; // 현재 턴을 의미
      return { ...state, tableData, recentCell: [action.row, action.cell] }; // 이것이 불변성을 지키면서 바꾼 것임
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        recentCell: [-1, -1]
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: '0' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    } // useEffect는 처음 렌더링될때에도 실행되기에 처음에는 실행을 막는다
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true이면 무승부라는 뜻(모두 차이 있기에)
      tableData.forEach(row => {
        // 무승부 검사
        row.forEach(cell => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN }); // 턴을 바꾸는 action을 dispatch한다 , 비동기가 섞여 있어서 이걸 Td에서 가져왔음
      }
    }
    console.log(tableData, win);
  }, [recentCell]);
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
