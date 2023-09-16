import {
  ifBlock,
  add_R0_to_R1,
  addrOf,
  compare_R0,
  compile,
  decrement_R0,
  goSub,
  halt,
  label,
  load_R0,
  load_R0_from_addr_offset,
  move_R0_to_R1,
  move_R1_to_R0,
  save_R0,
  save_R1,
  store_R0_to_addr_offset,
  subroutine,
} from "../compiler";
import { Instruction } from "../instructions";

export default compile([
  // =================
  // INSTRUCTIONS
  // -----------------
  load_R0_from_addr_offset(addrOf("DATA"), 0),
  // R0 Now has which fibonacci number to calculate
  goSub(addrOf("FIBONACCI")),
  // R0 Now has result of fibonacci calculation
  store_R0_to_addr_offset(addrOf("DATA"), 1),
  halt(),
  subroutine(label("FIBONACCI"), [
    save_R1([
      ifBlock(compare_R0(0), Instruction.JUMP_IF_LT_OR_EQ, {
        then: [load_R0(0)],
        else: [
          ifBlock(compare_R0(1), Instruction.JUMP_IF_LT_OR_EQ, {
            then: [load_R0(1)],
            else: [
              decrement_R0(),
              move_R0_to_R1(),
              goSub(addrOf("FIBONACCI")),
              save_R0([
                move_R1_to_R0(),
                decrement_R0(),
                goSub(addrOf("FIBONACCI")),
                move_R0_to_R1(),
              ]),
              add_R0_to_R1(),
            ],
          }),
        ],
      }),
    ]),
  ]),
  // =================
  // DATA
  // -----------------
  label("DATA"),
  4, // Fibonacci sequence input
  0, // Fibonacci sequence result (output)
  ...new Array(20).fill(0),
  // =================
  // STACK
  // -----------------
  ...new Array(20).fill(0),
]);
