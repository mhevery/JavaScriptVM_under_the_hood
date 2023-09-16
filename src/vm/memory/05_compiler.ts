import {
  addrOf,
  compile,
  goSub,
  halt,
  label,
  load_A0,
  load_AE0,
  subroutine,
} from "../compiler";
import { Instruction } from "../instructions";

export default compile([
  load_A0(addrOf("DATA")),
  load_AE0(0),
  goSub(addrOf("increment")),
  load_AE0(1),
  goSub(addrOf("increment")),
  load_AE0(2),
  goSub(addrOf("increment")),
  load_AE0(3),
  goSub(addrOf("increment")),
  halt(),
  subroutine(label("increment"), [
    Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0,
    Instruction.INCREMENT_R0,
    Instruction.STORE_R0_TO_ADDR_A0_PLUS_AE0,
  ]),
  label("DATA"),
  10, // DATA section
  20,
  30,
  40,
  label("STACK"),
  0, // STACK space
  0,
  0,
  0,
]);
