import { Injectable } from '@angular/core';

export interface DiffLine {
  text: string;
  type: 'added' | 'removed' | 'unchanged';
}

@Injectable({
  providedIn: 'root',
})
export class DiffService {
  /**
   * Computes a line-level diff between two texts using the LCS (Longest Common
   * Subsequence) algorithm. Returns an array of DiffLine objects indicating
   * which lines were added, removed, or unchanged.
   *
   * @param textA The original text.
   * @param textB The modified text.
   * @returns An array of DiffLine entries representing the diff.
   */
  computeDiff(textA: string, textB: string): DiffLine[] {
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');

    const lcsTable = this.buildLcsTable(linesA, linesB);
    return this.backtrack(lcsTable, linesA, linesB, linesA.length, linesB.length);
  }

  /**
   * Builds the LCS dynamic-programming table.
   * lcs[i][j] = length of LCS of linesA[0..i-1] and linesB[0..j-1].
   */
  private buildLcsTable(linesA: string[], linesB: string[]): number[][] {
    const m = linesA.length;
    const n = linesB.length;

    // Allocate (m+1) x (n+1) table initialised to 0
    const table: number[][] = Array.from({ length: m + 1 }, () =>
      new Array(n + 1).fill(0)
    );

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (linesA[i - 1] === linesB[j - 1]) {
          table[i][j] = table[i - 1][j - 1] + 1;
        } else {
          table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        }
      }
    }

    return table;
  }

  /**
   * Backtracks through the LCS table to produce the diff output.
   */
  private backtrack(
    table: number[][],
    linesA: string[],
    linesB: string[],
    i: number,
    j: number
  ): DiffLine[] {
    const result: DiffLine[] = [];

    let ci = i;
    let cj = j;

    // We'll collect in reverse and then reverse at the end.
    while (ci > 0 || cj > 0) {
      if (ci > 0 && cj > 0 && linesA[ci - 1] === linesB[cj - 1]) {
        // Lines match -- unchanged
        result.push({ text: linesA[ci - 1], type: 'unchanged' });
        ci--;
        cj--;
      } else if (cj > 0 && (ci === 0 || table[ci][cj - 1] >= table[ci - 1][cj])) {
        // Line exists only in B -- added
        result.push({ text: linesB[cj - 1], type: 'added' });
        cj--;
      } else if (ci > 0) {
        // Line exists only in A -- removed
        result.push({ text: linesA[ci - 1], type: 'removed' });
        ci--;
      }
    }

    result.reverse();
    return result;
  }
}
