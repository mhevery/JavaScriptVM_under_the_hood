import { Flags, Instruction } from "./instructions";
import { MEMORY } from "./fibonacci";

// REGISTERS

// General purpose registers
let R0: number = 0;
let R1: number = 0;
let A0: number = 0;
let AE0: number = 0;

// Flags register
let FLAGS: number = 0;

// Special purpose registers
// Program counter
let PC: number = 0;
// Stack pointer
let SP: number = MEMORY.length - 1;

logHeader();
let maxInstructionCount = 1000;
while (true) {
  switch (MEMORY[PC++]) {
    case Instruction.HALT:
      logState("HALT");
      logFooter();
      process.exit(0);
    case Instruction.LOAD_CONST_R0:
      setFlags((R0 = MEMORY[PC++]));
      logState("Loaded " + R0 + " into R0");
      break;
    case Instruction.LOAD_CONST_A0:
      A0 = MEMORY[PC++];
      logState("Loaded " + A0 + " into A0");
      break;
    case Instruction.LOAD_CONST_AE0:
      AE0 = MEMORY[PC++];
      logState("Loaded " + AE0 + " into AE0");
      break;
    case Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0:
      setFlags((R0 = MEMORY[A0 + AE0]));
      logState("Loaded " + R0 + " into R0 from address [A0+AE0]=" + (A0 + AE0));
      break;
    case Instruction.STORE_R0_TO_ADDR_A0_PLUS_AE0:
      MEMORY[A0 + AE0] = R0;
      logState("Stored " + R0 + " from R0 into address [A0+AE0]=" + (A0 + AE0));
      break;
    case Instruction.GO_SUB:
      const goSubAddr = MEMORY[PC++];
      logState(`GO_SUB to ${goSubAddr} R0=${R0}`);
      MEMORY[SP--] = PC;
      PC = goSubAddr;
      break;
    case Instruction.RETURN:
      PC = MEMORY[++SP];
      logState(`RETURN to ${PC} R0=${R0}`);
      break;
    case Instruction.COMPARE_R0_TO_CONST:
      setFlags(R0 - MEMORY[PC++]);
      logState(`Compare R0(${R0}) with ${MEMORY[PC - 1]}`);
      break;
    case Instruction.JUMP:
      PC = MEMORY[PC++];
      logState("Jump to " + PC);
      break;
    case Instruction.JUMP_IF_LT_OR_EQ:
      if (FLAGS & Flags.LESS_THAN || FLAGS & Flags.EQUAL) {
        PC = MEMORY[PC++];
        logState("Jump if less than to " + PC);
      } else {
        PC++;
        logState("Jump if less than skipped");
      }
      break;
    case Instruction.PUSH_R0:
      logState(`Push R0(${R0}) to stack`);
      MEMORY[SP--] = R0;
      break;
    case Instruction.POP_R0:
      setFlags((R0 = MEMORY[++SP]));
      logState(`Pop stack to restore R0(${R0})`);
      break;
    case Instruction.PUSH_R1:
      logState(`Push R1(${R1}) to stack`);
      MEMORY[SP--] = R1;
      break;
    case Instruction.POP_R1:
      R1 = MEMORY[++SP];
      logState(`Pop stack to restore R1(${R1})`);
      break;
    case Instruction.DECREMENT_R0:
      setFlags(--R0);
      logState(`Decrement R0 to ${R0}`);
      break;
    case Instruction.ADD_R0_TO_R1:
      const oldR0 = R0;
      setFlags((R0 = R0 + R1));
      logState(`Add R0(${oldR0}) + R1(${R1}) => R0(${R0})`);
      break;
    case Instruction.MOVE_R0_TO_R1:
      R1 = R0;
      logState(`move R0(${R0}) to R1`);
      break;
    case Instruction.MOVE_R1_TO_R0:
      setFlags((R0 = R1));
      logState(`move R1(${R0}) to R0`);
      break;
    default:
      throw new Error("Unknown instruction: " + MEMORY[PC - 1]);
  }
}

function setFlags(value: number) {
  FLAGS =
    (value == 0 ? Flags.EQUAL : 0) |
    (value < 0 ? Flags.LESS_THAN : 0) |
    (value > 0 ? Flags.GRATER_THAN : 0);
}

function logHeader() {
  log("┌─┬─┐", ["", "", "", "", "", "", ""]);
  log("│ │ │", ["PC", "SP", "FLAGS", "R0", "R1", "A0", "AE0"]);
  log("├─┼─┤", ["", "", "", "", "", "", ""]);
}
function logFooter() {
  log("└─┴─┘", ["", "", "", "", "", "", ""]);
}
function logState(text: string) {
  log("│ │ │", [PC, SP, FLAGS, R0, R1, A0, AE0], text);
  if (maxInstructionCount-- < 0) {
    console.log("Runaway loop detected. Aborting.");
    process.exit(1);
  }
}
function log(decoration: string, args: any[], text?: string) {
  const prefix = decoration[0];
  const padding = decoration[1];
  const infix = decoration[2];
  const suffix = decoration[4];
  const line: string[] = [];
  for (let i = 0; i < args.length; i++) {
    let item = String(args[i]);
    while (item.length < 8) {
      item = padding + item;
    }
    line.push(item);
  }
  const indent = new Array(MEMORY.length - SP).fill(" ").join("");
  console.log(
    prefix + line.join(infix) + suffix + indent + (text ? " " + text : "")
  );
}
