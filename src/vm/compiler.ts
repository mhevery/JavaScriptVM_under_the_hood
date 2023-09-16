import exp from "constants";
import { Instruction } from "./instructions";

interface Address {
  _BRAND: "Address";
}

interface Label {
  _BRAND: "Label";
}

export function addrOf(label: string): Address {
  return ("&" + label) as any;
}

export function label(label: string): Label {
  return (":" + label) as any;
}

export function load_R0(value: number) {
  return [Instruction.LOAD_CONST_R0, value];
}

export function load_A0(address: Address) {
  return [Instruction.LOAD_CONST_A0, address];
}

export function load_AE0(value: number) {
  return [Instruction.LOAD_CONST_AE0, value];
}

export function load_A0_offset(address: Address, offset: number) {
  return [...load_A0(address), ...load_AE0(offset)];
}

export function load_R0_from_addr_offset(address: Address, offset: number) {
  return [
    ...load_A0_offset(address, offset),
    Instruction.LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0,
  ];
}

export function goSub(address: Address) {
  return [Instruction.GO_SUB, address];
}

export function store_R0_to_addr_offset(address: Address, offset: number) {
  return [
    ...load_A0_offset(address, offset),
    Instruction.STORE_R0_TO_ADDR_A0_PLUS_AE0,
  ];
}

export function halt() {
  return [Instruction.HALT];
}

export function push_R1() {
  return [Instruction.PUSH_R1];
}

export function save_R0(instructions: any[]) {
  return [Instruction.PUSH_R0, ...instructions, Instruction.POP_R0];
}
export function save_R1(instructions: any[]) {
  return [Instruction.PUSH_R1, ...instructions, Instruction.POP_R1];
}

export function move_R0_to_R1() {
  return [Instruction.MOVE_R0_TO_R1];
}

export function move_R1_to_R0() {
  return [Instruction.MOVE_R1_TO_R0];
}

export function add_R0_to_R1() {
  return [Instruction.ADD_R1_TO_R0];
}

export function decrement_R0() {
  return [Instruction.DECREMENT_R0];
}

let labelId = 0;

export function jump(addr: Address) {
  return [Instruction.JUMP, addr];
}

export function compare_R0(value: number) {
  return [Instruction.COMPARE_R0_TO_CONST, value];
}

export function ifBlock(
  expression: any,
  condition: Instruction,
  { then, else: _else }: any
) {
  const labelThen = "THEN_" + labelId++;
  const labelEnd = "END_" + labelId++;
  return [
    ...expression,
    condition,
    addrOf(labelThen),
    ..._else,
    jump(addrOf(labelEnd)),
    label(labelThen),
    ...then,
    label(labelEnd),
  ];
}

export function subroutine(label: Label, instructions: any[]) {
  return [label, ...instructions, Instruction.RETURN];
}

export function compile(
  input: (number | string | Label | Array<any>)[]
): number[] {
  input = input.flat(Infinity);
  const out: (string | number)[] = [];
  const labels = new Map<string, number>();
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    if (typeof value === "string") {
      if (value.startsWith(":")) {
        if (labels.has(value.substring(1))) {
          throw new Error("Label already defined: " + value);
        }
        labels.set(value.substring(1), i - labels.size);
      } else if (value.startsWith("&")) {
        out.push(value.substring(1));
      } else {
        throw new Error("Invalid label: " + value);
      }
    } else {
      out.push(value as number);
    }
  }
  return out.map((v) => {
    const value = typeof v === "string" ? labels.get(v) : v;
    if (value === undefined) {
      throw new Error("Label not found: " + v);
    }
    return value as number;
  });
}
