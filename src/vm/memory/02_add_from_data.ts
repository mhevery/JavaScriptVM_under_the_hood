import { Instruction } from "../instructions";

export default [
  Instruction.LOAD_CONST_A0,
  13, // 13 is the address of the first element of the DATA section
  Instruction.LOAD_CONST_AE0,
  0,
  Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0,
  Instruction.LOAD_CONST_AE0,
  1,
  Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R1,
  Instruction.ADD_R1_TO_R0,
  Instruction.LOAD_CONST_AE0,
  2,
  Instruction.STORE_R0_TO_ADDR_A0_PLUS_AE0,
  Instruction.HALT,
  3, // DATA section
  5,
  0,
];
