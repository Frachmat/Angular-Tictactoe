import { Component } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent {
  currentPlayer: 'X' | 'O' = 'X';
  board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  gameOver = false;
  winner: string | null = null;
  winnerCells: number[][] = [];

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.gameOver) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkForWin(row, col)) {
        this.gameOver = true;
        this.winner = this.currentPlayer;
        this.winnerCells = this.getWinningCells(row, col);
      } else if (this.isBoardFull()) {
        this.gameOver = true;
        this.winner = null;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkForWin(row: number, col: number): boolean {
    return (
      this.checkRow(row) || this.checkCol(col) || this.checkDiagonals(row, col)
    );
  }

  checkRow(row: number): boolean {
    return (
      this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    );
  }

  checkCol(col: number): boolean {
    return (
      this.board[0][col] === this.currentPlayer &&
      this.board[1][col] === this.currentPlayer &&
      this.board[2][col] === this.currentPlayer
    );
  }

  checkDiagonals(row: number, col: number): boolean {
    if (row === col || row + col === 2) {
      return (
        (this.board[0][0] === this.currentPlayer &&
          this.board[1][1] === this.currentPlayer &&
          this.board[2][2] === this.currentPlayer) ||
        (this.board[0][2] === this.currentPlayer &&
          this.board[1][1] === this.currentPlayer &&
          this.board[2][0] === this.currentPlayer)
      );
    }
    return false;
  }

  isWinnerCell(row: number, col: number): boolean {
    for (const cell of this.winnerCells) {
      if (cell[0] === row && cell[1] === col) {
        return true;
      }
    }
    return false;
  }

  isBoardFull(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  resetGame() {
    this.currentPlayer = 'X';
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.gameOver = false;
    this.winner = null;
    this.winnerCells = [];
  }

  getWinningCells(row: number, col: number): number[][] {
    let winningCells: number[][] = [];

    if (this.checkRow(row)) {
      winningCells = [[row, 0], [row, 1], [row, 2]];
    } else if (this.checkCol(col)) {
      winningCells = [[0, col], [1, col], [2, col]];
    } else if (this.checkDiagonals(row, col)) {
      if (row === col) {
        winningCells = [[0, 0], [1, 1], [2, 2]];
      } else if (row + col === 2) {
        winningCells = [[0, 2], [1, 1], [2, 0]];
      }
    }

    return winningCells;
  }
}
