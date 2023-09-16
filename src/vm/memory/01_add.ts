import { Instruction } from "../instructions";

export default [
  Instruction.LOAD_CONST_R0,
  5,
  Instruction.LOAD_CONST_R1,
  3,
  Instruction.ADD_R1_TO_R0,
  Instruction.HALT,
];
