import { Instruction } from "../instructions";

// THIS IS SUPPOSED TO CRASH
//
//
//
//
//
export default [
  Instruction.LOAD_CONST_A0,
  23, // 23 is the address of the first element of the DATA section
  Instruction.LOAD_CONST_AE0,
  0,
  Instruction.GO_SUB,
  19, // Address of the subroutine
  Instruction.LOAD_CONST_AE0,
  1,
  Instruction.GO_SUB,
  19, // Address of the subroutine
  Instruction.LOAD_CONST_AE0,
  2,
  Instruction.GO_SUB,
  19, // Address of the subroutine
  Instruction.LOAD_CONST_AE0,
  3,
  Instruction.GO_SUB,
  19, // Address of the subroutine
  Instruction.HALT,
  Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0, // Subroutine
  Instruction.INCREMENT_R0,
  Instruction.STORE_R0_TO_ADDR_A0_PLUS_AE0,
  Instruction.RETURN,
  10, // DATA section
  20,
  30,
  40,
];
