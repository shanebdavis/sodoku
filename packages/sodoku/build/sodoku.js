"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Math", "clone"], [global, require('art-standard-lib')], (Math, clone) => {let allEncodedNumbers, allGroupsOk, isAllOk, squareNumberForLocation, get81XY, get9XY, eachElementInColunn, eachElementInRow, eachElementInSquare, isValidGroup, isAllValid, isLegalGroup, isAllLegal, encodeNumber, addEncodedNumber, removeEncodedNumber, toggleEncodedNumber, hasEncodedNumber, mergeBoards, getLegalNumbers, getUnfinishedNumbers, getAllLegalNumbers, getAllUnfinishedNumbers, invLog2, solve; allEncodedNumbers = 0b111111111; return {allGroupsOk: allGroupsOk = function(board, eachElementInGroup, testEachElementInGroup) {let into, i1; return !(into = null, i1 = 0, (() => {while (i1 < 9) {let i; i = i1; if (into = !testEachElementInGroup(board, i, eachElementInGroup)) {break;}; i1++;};})(), into || null);}, isAllOk: isAllOk = function(board, testEachElementInGroup) {return allGroupsOk(board, eachElementInRow, testEachElementInGroup) && allGroupsOk(board, eachElementInColunn, testEachElementInGroup) && allGroupsOk(board, eachElementInSquare, testEachElementInGroup);}, squareNumberForLocation: squareNumberForLocation = function(x, y) {return (x / 3 | 0) + (y / 3 | 0) * 3;}, get81XY: get81XY = function(i81) {return [i81 % 9, i81 / 9 | 0];}, get9XY: get9XY = function(i9) {return [i9 % 3, i9 / 3 | 0];}, eachElementInColunn: eachElementInColunn = function(board, colNumber, f) {let i1; return (i1 = 0, (() => {while (i1 < 9) {let i; i = i1; f(board[i][colNumber]); i1++;};})(), 9);}, eachElementInRow: eachElementInRow = function(board, rowNumber, f) {let i1; return (i1 = 0, (() => {while (i1 < 9) {let i; i = i1; f(board[rowNumber][i]); i1++;};})(), 9);}, eachElementInSquare: eachElementInSquare = function(board, squareNumber, f) {let x, y, i1; ([x, y] = get9XY(squareNumber)); return (i1 = 0, (() => {while (i1 < 9) {let c, i, j; c = i1; ([i, j] = get9XY(c)); f(board[y * 3 + j][x * 3 + i]); i1++;};})(), 9);}, isValidGroup: isValidGroup = function(board, groupNumber, eachElementInGroup) {let encodedNumbers; encodedNumbers = 0; eachElementInGroup(board, groupNumber, (v) => encodedNumbers = addEncodedNumber(encodedNumbers, v)); return encodedNumbers === allEncodedNumbers;}, isAllValid: isAllValid = function(board) {return isAllOk(board, isValidGroup);}, isLegalGroup: isLegalGroup = function(board, groupNumber, eachElementInGroup) {let encodedNumbers, isLegal; encodedNumbers = 0; isLegal = true; eachElementInGroup(board, groupNumber, (v) => (v > 0) ? hasEncodedNumber(encodedNumbers, v) ? isLegal = false : encodedNumbers = addEncodedNumber(encodedNumbers, v) : undefined); return isLegal;}, isAllLegal: isAllLegal = function(board) {return isAllOk(board, isLegalGroup);}, encodeNumber: encodeNumber = function(number) {return (number === 0) ? 0 : 1 << number - 1;}, addEncodedNumber: addEncodedNumber = function(numbers, number) {return numbers | encodeNumber(number);}, removeEncodedNumber: removeEncodedNumber = function(numbers, number) {return numbers & allEncodedNumbers - encodeNumber(number);}, toggleEncodedNumber: toggleEncodedNumber = function(numbers, number) {return numbers ^ encodeNumber(number);}, hasEncodedNumber: hasEncodedNumber = function(numbers, number) {return !!(numbers & encodeNumber(number));}, mergeBoards: mergeBoards = function(boardA, boardB) {return Caf.array(boardA, (row, y) => Caf.array(row, (number, x) => boardB[y][x] || boardA[y][x]));}, getLegalNumbers: getLegalNumbers = function(board, x, y) {let squareNumber, legalNumbers, f, x1, y1, i1, i2, i3; squareNumber = squareNumberForLocation(x, y); legalNumbers = allEncodedNumbers; f = (v) => legalNumbers = removeEncodedNumber(legalNumbers, v); i1 = 0; while (i1 < 9) {let i; i = i1; f(board[i][x]); i1++;}; 9; i2 = 0; while (i2 < 9) {let i; i = i2; f(board[y][i]); i2++;}; 9; ([x1, y1] = get9XY(squareNumber)); i3 = 0; while (i3 < 9) {let c, i, j; c = i3; ([i, j] = get9XY(c)); f(board[y1 * 3 + j][x1 * 3 + i]); i3++;}; 9; return legalNumbers;}, getUnfinishedNumbers: getUnfinishedNumbers = function(board, x, y) {let squareNumber, unfinishedNumbers, f, x1, y1, i1; squareNumber = squareNumberForLocation(x, y); unfinishedNumbers = allEncodedNumbers; f = (v) => unfinishedNumbers = removeEncodedNumber(unfinishedNumbers, v); ([x1, y1] = get9XY(squareNumber)); i1 = 0; while (i1 < 9) {let c, i, j; c = i1; ([i, j] = get9XY(c)); f(board[y1 * 3 + j][x1 * 3 + i]); i1++;}; 9; return unfinishedNumbers;}, getAllLegalNumbers: getAllLegalNumbers = function(board) {return Caf.array(board, (row, y) => Caf.array(row, (number, x) => (number > 0) ? 0 : getLegalNumbers(board, x, y)));}, getAllUnfinishedNumbers: getAllUnfinishedNumbers = function(board) {return Caf.array(board, (row, y) => Caf.array(row, (number, x) => getUnfinishedNumbers(board, x, y)));}, invLog2: invLog2 = 1 / Math.log(2), solve: solve = function(board, numSolutionsToReturn = 1) {let solutions, steps, recursiveSolver; solutions = []; steps = 0; recursiveSolver = (board, i81 = 0) => {let x, y, legalNumbers, into, i; ([x, y] = get81XY(i81)); steps++; return (() => {switch (false) {case !(0 === board[y][x]): return (0 !== (legalNumbers = getLegalNumbers(board, x, y))) ? (into = null, i = 1, (() => {while (i <= 9) {let n; n = i; if (into = hasEncodedNumber(legalNumbers, n) ? (board[y][x] = n, (80 === i81) ? solutions.push(clone(board)) : recursiveSolver(board, i81 + 1), board[y][x] = 0, (solutions.length >= numSolutionsToReturn) ? true : undefined) : undefined) {break;}; i++;};})(), into || null) || undefined : undefined; case !(80 === i81): solutions.push(clone(board)); return board; default: return recursiveSolver(board, i81 + 1);};})();}; recursiveSolver(clone(board)); return (numSolutionsToReturn > 1) ? solutions : solutions[0];}};});});
//# sourceMappingURL=sodoku.js.map
